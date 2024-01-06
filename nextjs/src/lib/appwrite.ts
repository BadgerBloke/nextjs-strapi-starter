import { Account, Client, Databases, ID, Models, Query, Teams } from 'appwrite';

import appwriteConfig from '~/config/appwrite';
import { ROLES } from '~/constants/roles';

type CreateUserAccount = {
    email: string;
    password: string;
    name: string;
};

type LoginUserAccount = {
    email: string;
    password: string;
};

export type OnboardingType = number | 'COMPLETE';

type UserAndSession = Models.User<Models.Preferences> & {
    session: Models.Session;
};

export type MembershipAndUserDetail = UserAndSession &
    Partial<Models.TeamList<Models.Preferences>> &
    Partial<Models.MembershipList> & {
        prefs?: {
            avatar?: { secure_url: string; public_id: string };
            roles?: ROLES;
        };
    };

const appwriteClient = new Client();
appwriteClient.setEndpoint(appwriteConfig.appwriteUrl).setProject(appwriteConfig.appwriteProjectID);

export const account = new Account(appwriteClient);
export const teams = new Teams(appwriteClient);
export const databases = new Databases(appwriteClient);

export class AppwriteService {
    user: MembershipAndUserDetail | null = null;
    // Create a new record of user inside appwrite
    async createUserAccount({ email, password, name }: CreateUserAccount) {
        const userAccount = await account.create(ID.unique(), email, password, name);
        if (userAccount) {
            return this.login({ email, password });
        }
        return userAccount;
    }

    async login({ email, password }: LoginUserAccount) {
        const session = await account.createEmailSession(email, password);
        await this.getMembershipData();
        return session;
    }

    async isLoggedIn() {
        const data = await this.getCurrentUser();
        return { status: Boolean(data), data };
    }

    async getCurrentUser() {
        try {
            if (!this.user) {
                const u = await account.get();
                const session = await account.getSession('current');
                this.user = { ...u, session };
                await this.setJWTSession();
                return { ...u, session };
            } else {
                return this.user;
            }
        } catch (err) {
            return null;
        }
    }

    async getUserPrefs() {
        return account.getPrefs();
    }

    async logout() {
        this.user = null;
        return await account.deleteSession('current');
    }

    async getMembershipData(): Promise<MembershipAndUserDetail | null> {
        const getMembership = async (u: UserAndSession) => {
            try {
                const t = await teams.list();
                if (t) {
                    const m = await teams.listMemberships(t.teams?.[0]?.$id, [Query.equal('userId', `${u.$id}`)]);
                    if (m) {
                        const completeUser = { ...u, ...t, ...m };
                        this.user = completeUser;
                        return completeUser;
                    }
                }
                return { ...u, ...t };
            } catch (err) {
                return u;
            }
        };

        try {
            if (!this.user) {
                const u = await this.getCurrentUser();
                if (u) {
                    return await getMembership(u);
                }
                return u;
            } else {
                if (this.user.total) return this.user;

                return await getMembership(this.user);
            }
        } catch (err) {
            return this.user;
        }
    }

    async setJWTSession(): Promise<boolean> {
        try {
            const token = await account.createJWT();
            const res = await fetch('/session-validator', {
                method: 'GET',
                headers: {
                    token: token.jwt,
                    sessionId: this.user?.session.$id || '',
                },
            }).then(r => r.json());

            if (res.status === 200) {
                return true;
            }
            return false;
        } catch (err) {
            return false;
        }
    }
}

const appwriteService = new AppwriteService();
export default appwriteService;

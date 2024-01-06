import { Account, Client, Databases, Models, Query, Teams } from 'node-appwrite';

import appwriteConfig from '~/config/appwrite';
import { ROLES } from '~/constants/roles';

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

// ---------- APPWRITE SERVER WITH API ---------- //

export const appwriteAPIClient = new Client();
appwriteAPIClient
    .setEndpoint(appwriteConfig.appwriteUrl)
    .setProject(appwriteConfig.appwriteProjectID)
    .setKey(appwriteConfig.appwriteAPIKey);

export const apiTeams = new Teams(appwriteAPIClient);
export const apiDatabases = new Databases(appwriteAPIClient);

// ---------- APPWRITE SERVER WITH JWT ---------- //
export const appwriteServerClient = new Client();
appwriteServerClient.setEndpoint(appwriteConfig.appwriteUrl).setProject(appwriteConfig.appwriteProjectID);

export const serverAccount = new Account(appwriteServerClient);
export const serverTeams = new Teams(appwriteServerClient);
export const serverDatabases = new Databases(appwriteServerClient);

export class AppwriteServerService {
    user: MembershipAndUserDetail | null = null;

    async isLoggedIn() {
        const data = await this.getCurrentUser();
        return { status: Boolean(data), data };
    }

    async getCurrentUser() {
        try {
            if (!this.user) {
                const u = await serverAccount.get();
                const session = await serverAccount.getSession('current');
                this.user = { ...u, session };
                return { ...u, session };
            } else {
                return this.user;
            }
        } catch (err) {
            return null;
        }
    }

    async getUserPrefs() {
        return serverAccount.getPrefs();
    }

    async logout() {
        this.user = null;
        return await serverAccount.deleteSession('current');
    }

    async getMembershipData(): Promise<MembershipAndUserDetail | null> {
        const getMembership = async (u: UserAndSession) => {
            try {
                const t = await serverTeams.list();
                if (t) {
                    const m = await serverTeams.listMemberships(t.teams?.[0]?.$id, [Query.equal('userId', `${u.$id}`)]);
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
}

const appwriteServerService = new AppwriteServerService();
export default appwriteServerService;

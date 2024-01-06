import { NextResponse } from 'next/server';
import httpStatus from 'http-status';

import { MembershipAndUserDetail } from './appwrite-server';

const isValidUser = (headersList: string | null) => {
    if (!headersList)
        return NextResponse.json({ message: httpStatus['412_MESSAGE'] }, { status: httpStatus.PRECONDITION_FAILED });

    const user: MembershipAndUserDetail = JSON.parse(headersList);

    if (!user.session.providerAccessToken)
        return NextResponse.json({ message: httpStatus['403_MESSAGE'] }, { status: httpStatus.FORBIDDEN });

    return user;
};

export { isValidUser };

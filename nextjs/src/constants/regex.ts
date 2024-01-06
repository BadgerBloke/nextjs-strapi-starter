export const UserRegex = {
    fullName: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
};

export const OrganizationRegex = {
    name: /^[a-zA-Z0-9_\- ]*$/,
};

export const ContactRegex = {
    phone: /^[0-9]{10}$/,
    pincode: /^[0-9]{6}$/,
};

export const authRoles = {
    SA: ['SA'], // Only super admin has access
    admin: ['SA', 'ADMIN'], // Only Admin has access
    pitchOwner: ['SA', 'ADMIN', 'PITCH_OWNER'], // Only PITCH_OWNER and Admin has access
}

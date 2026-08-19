const isAdminAppType = appType =>
  String(appType || '')
    .trim()
    .toUpperCase() === 'ADMIN';

const buildUsersListRequestParams = ({appType} = {}) => {
  if (isAdminAppType(appType)) {
    return {};
  }
  return {};
};

const canManageCompanyUsers = ({appType, userHasRoleFn, user} = {}) => {
  const normalized = String(appType || '')
    .trim()
    .toUpperCase();
  if (normalized === 'ADMIN') {
    return typeof userHasRoleFn === 'function'
      ? userHasRoleFn(user, 'ROLE_SUPER') || userHasRoleFn(user, 'ROLE_ADMIN')
      : false;
  }
  if (typeof userHasRoleFn === 'function') {
    return (
      userHasRoleFn(user, 'ROLE_CLIENT') ||
      userHasRoleFn(user, 'ROLE_ADMIN') ||
      userHasRoleFn(user, 'ROLE_SUPER')
    );
  }
  return true;
};

const resolveUsersPageTitle = ({appType} = {}) => {
  if (isAdminAppType(appType)) {
    return 'Usuários (todas as empresas)';
  }
  return 'Usuários da empresa';
};

module.exports = {
  buildUsersListRequestParams,
  canManageCompanyUsers,
  isAdminAppType,
  resolveUsersPageTitle,
};

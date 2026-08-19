const {
  buildUsersListRequestParams,
  canManageCompanyUsers,
  isAdminAppType,
  resolveUsersPageTitle,
} = require('../../../react/utils/usersListHelpers');

describe('usersListHelpers', () => {
  it('detects admin app type', () => {
    expect(isAdminAppType('ADMIN')).toBe(true);
    expect(isAdminAppType('admin')).toBe(true);
    expect(isAdminAppType('MANAGER')).toBe(false);
  });

  it('builds empty request params for both scopes (API-driven)', () => {
    expect(buildUsersListRequestParams({appType: 'ADMIN'})).toEqual({});
    expect(buildUsersListRequestParams({appType: 'MANAGER'})).toEqual({});
  });

  it('resolves page title by app type', () => {
    expect(resolveUsersPageTitle({appType: 'ADMIN'})).toBe(
      'Usuários (todas as empresas)',
    );
    expect(resolveUsersPageTitle({appType: 'MANAGER'})).toBe(
      'Usuários da empresa',
    );
  });

  it('gates management by roles', () => {
    const hasRole = (user, role) => (user?.roles || []).includes(role);
    expect(
      canManageCompanyUsers({
        appType: 'ADMIN',
        user: {roles: ['ROLE_HUMAN']},
        userHasRoleFn: hasRole,
      }),
    ).toBe(false);
    expect(
      canManageCompanyUsers({
        appType: 'ADMIN',
        user: {roles: ['ROLE_SUPER']},
        userHasRoleFn: hasRole,
      }),
    ).toBe(true);
    expect(
      canManageCompanyUsers({
        appType: 'MANAGER',
        user: {roles: ['ROLE_CLIENT']},
        userHasRoleFn: hasRole,
      }),
    ).toBe(true);
  });
});

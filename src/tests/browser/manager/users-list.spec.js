/**
 * Acceptance (app-community#95):
 * - Manager has a general users list for the current company
 * - ADMIN app_type lists users across companies (title/scope)
 *
 * Route registration: ui-manager UsersPage path `users`.
 */
const {describe, expect, it} = global;

describe('Manager users list (app-community#95)', () => {
  it('registers UsersPage scope titles for Manager and ADMIN', () => {
    const helpers = require('../../../react/utils/usersListHelpers');
    expect(helpers.resolveUsersPageTitle({appType: 'MANAGER'})).toBe(
      'Usuários da empresa',
    );
    expect(helpers.resolveUsersPageTitle({appType: 'ADMIN'})).toBe(
      'Usuários (todas as empresas)',
    );
  });
});

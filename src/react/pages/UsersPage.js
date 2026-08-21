import React, {useEffect, useMemo} from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useStore} from '@store';
import {app_type_base} from '@appType';
import DefaultTable from '@controleonline/ui-default/src/react/components/table/DefaultTable';
import {resolveThemePalette} from '@controleonline/../../src/styles/branding';
import {colors} from '@controleonline/../../src/styles/colors';
import {userHasRole} from '@controleonline/ui-common/src/react/utils/runtimeMenu';
import styles from './UsersPage.styles';
import {
  buildUsersListRequestParams,
  canManageCompanyUsers,
  resolveUsersPageTitle,
} from '../utils/usersListHelpers';

/**
 * Company-scoped users list for Manager (all companies when app_type=ADMIN).
 * Create / password / API key remain available in person details UsersTab;
 * this page is the general inventory requested on app-community#95.
 */
export default function UsersPage() {
  const navigation = useNavigation();
  const peopleStore = useStore('people');
  const themeStore = useStore('theme');
  const authStore = useStore('auth');

  const {currentCompany, defaultCompany} = peopleStore.getters || {};
  const {user} = authStore.getters || {};
  const {colors: themeColors} = themeStore.getters || {};

  const mainCompany = defaultCompany || currentCompany || null;
  const canManage = canManageCompanyUsers({
    appType: app_type_base,
    user,
    userHasRoleFn: userHasRole,
  });
  const pageTitle = resolveUsersPageTitle({appType: app_type_base});

  const palette = useMemo(
    () =>
      resolveThemePalette(
        {...themeColors, ...(mainCompany?.theme?.colors || {})},
        colors,
      ),
    [mainCompany?.id, mainCompany?.theme?.colors, themeColors],
  );

  const requestParams = useMemo(
    () => buildUsersListRequestParams({appType: app_type_base}),
    [],
  );

  useEffect(() => {
    navigation?.setOptions?.({title: pageTitle});
  }, [navigation, pageTitle]);

  if (!canManage) {
    return (
      <SafeAreaView
        style={[styles.container, {backgroundColor: palette.background}]}
        edges={['bottom']}>
        <View style={styles.deniedCard}>
          <Text style={styles.deniedTitle}>Acesso restrito</Text>
          <Text style={styles.deniedText}>
            Você não tem permissão para listar usuários neste contexto.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: palette.background}]}
      edges={['bottom']}>
      <View style={styles.content}>
        <View style={styles.tableCard}>
          <DefaultTable
            accentColor={palette.primary}
            requestParams={requestParams}
            storeName="users"
            visibleColumnsPreferenceKey="users_company_list"
            showTotalItemsInCompactToolbar
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

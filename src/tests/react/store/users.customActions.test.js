/* global jest */

const {beforeEach, describe, expect, it} = global

jest.mock('@controleonline/ui-common/src/api', () => ({
  api: {
    fetch: jest.fn(),
  },
}))

const {api} = require('@controleonline/ui-common/src/api')
const actions = require('../../../store/users/customActions')
const types = require('@controleonline/ui-default/src/store/default/mutation_types')

describe('users customActions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('updates the authenticated user preferences through the dedicated endpoint', async () => {
    const commit = jest.fn()
    const response = {timezone: 'America/Sao_Paulo', timezone_id: 12}

    api.fetch.mockResolvedValueOnce(response)

    const result = await actions.updateMyPreferences(
      {commit},
      {timezone: '/timezones/12'},
    )

    expect(result).toEqual(response)
    expect(api.fetch).toHaveBeenCalledWith('users/preferences', {
      method: 'PUT',
      body: {timezone: '/timezones/12'},
    })
    expect(commit).toHaveBeenCalledWith(types.SET_ERROR, '')
    expect(commit).toHaveBeenCalledWith(types.SET_ISLOADING)
    expect(commit).toHaveBeenLastCalledWith(types.SET_ISLOADING, false)
  })
})

import * as actions from '../../src/actions/modalActions'
import { MODAL_ACTION_TYPES as types } from '../../src/constants'

describe('actions', () => {
	it('should create an action to set a modal', () => {
		const type = 'type'
		const props = 'props'
		const expectedActions = {
			type: types.SET_MODAL,
			payload: {
				'type': type,
				'props': props 
			}
		}
		expect(actions.setModal(type, props)).toEqual(expectedActions)
	}),
	it('should create an action to show a modal', () => {
		const expectedActions = {
			type: types.SHOW_MODAL
		}
		expect(actions.showModal()).toEqual(expectedActions)
	})
})
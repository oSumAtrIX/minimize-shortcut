const { Plugin } = require('powercord/entities');
const { React, getModule } = require('powercord/webpack');

const Settings = require('./components/Settings.jsx');

module.exports = class MinimizeShortcut extends Plugin {
	constructor() {
		super();
		this._eventRegisterId = -1;
	}

	async startPlugin() {
		powercord.api.settings.registerSettings(this.entityID, {
			category: this.entityID,
			label: 'Minimize Shortcut',
			render: Settings, // currently does not work because we need the keycodes, not the actual name of the key.
		});

		this._window = await getModule(['minimize', 'focus']);
		this._discordUtilities = await getModule([
			'inputEventRegister',
			'inputEventUnregister',
		]);

		// register the key event
		this._discordUtilities.inputEventRegister(
			(this._eventRegisterId = new Date().getTime()),
			[
				[0, 162], // Ctrl
				[0, 89], // Y
			],
			this._toggleWindow.bind(this),
			{
				blurred: true,
				focused: true,
				keydown: true,
			}
		);
	}

	_toggleWindow() {
		if (document.hidden) {
			this._window.focus(true, true);
			return;
		}
		this._window.minimize();
	}

	pluginWillUnload() {
		powercord.api.settings.unregisterSettings(this.entityID);

		// does not work yet
		this._discordUtilities.inputEventUnregister(this._eventRegisterId);
	}
};

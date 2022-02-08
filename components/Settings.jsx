const { React } = require('powercord/webpack');
const KeybindRecorder = require('./KeybindRecorder');

module.exports = class MinimizeShortcutSettings extends React.Component {
	render() {
		const { getSetting, updateSetting } = this.props;

		return (
			<div>
				<KeybindRecorder
					value={getSetting('minimize-shortcut')}
					onChange={(e) => {
						this.setState({ value: e });
						updateSetting('minimize-shortcut', e);
					}}
					onReset={() => {
						this.setState({ value: 'Control+Y' });
						updateSetting('minimize-shortcut', 'Ctrl+Y');
					}}
				>
					Choose a shortcut
				</KeybindRecorder>
			</div>
		);
	}
};

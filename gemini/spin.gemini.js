import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import Button from '../src/button/button';
import Spin from '../src/spin/spin';

const NAME = 'spin';
const THEMES = ['alfa-on-color', 'alfa-on-white'];
const SIZES = process.env.ALL_SIZES ? ['s', 'm', 'l', 'xl'] : ['m'];

const PROP_SETS = [
    {},
    { disabled: true }
];

geminiReact.suite(NAME, function () {
    THEMES.forEach((theme) => {
        let themeSelector = `${NAME}_theme_${theme}`;

        SIZES.forEach((size) => {
            let sizeSelector = `${NAME}_size_${size}`;

            PROP_SETS.forEach((set, index) => {
                let selector = `${themeSelector}.${sizeSelector}.${NAME}_prop-set_${index + 1}`;

                geminiReact.suite(selector, function (suite) {
                    let props = {
                        theme,
                        size,
                        icon: <Spin size={ size } visible={ true } />
                    };
                    let template = (
                        <GeminiBox theme={ theme }>
                            <Button { ...props }>
                                Button
                            </Button>
                        </GeminiBox>
                    );

                    if (set.disabled) {
                        suite
                            .render(template)
                            .capture('plain');
                    } else {
                        suite
                            .render(template)
                            .capture('plain')
                            .capture('hovered', function (actions) {
                                actions.mouseMove(this.renderedComponent);
                            })
                            .capture('pressed', function (actions) {
                                actions.mouseDown(this.renderedComponent);
                            })
                            .capture('clicked', function (actions) {
                                actions.mouseUp(this.renderedComponent);
                            });
                    }
                });
            });
        });
    });
});

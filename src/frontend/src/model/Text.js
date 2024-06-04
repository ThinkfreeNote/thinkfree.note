export class Text {
    constructor(id, value, fontStyle) {
        this.id = id;
        this.value = value;
        this.fontStyle = fontStyle;
    }

    updateFontStyle(styleName, value, isMultiSelectedText) {
        let newStyleValue = value;

        // 텍스트가 하나만 선택되고 value가 같으면 "" 적용 (off 기능)
        if (this.fontStyle[styleName] === value && !isMultiSelectedText) {
            newStyleValue = "";
        }

        this.fontStyle = {
            ...this.fontStyle,
            [styleName]: newStyleValue
        };
    }
}

module.exports = {
	// GLOBAL
	printWidth: 100,
	tabWidth: 4,
	useTabs: true,
	// COMMON
	singleQuote: true,
	bracketSpacing: true, // 大括号内的首尾需不需要空格?
	proseWrap: 'preserve', // 折行标准
	// JS
	semi: false,
	jsxSingleQuote: true, // jsx 使用单/双引号
	jsxBracketSameLine: false, // jsx 标签的反尖括号需要换行
	// quoteProps: 'as-needed', // 对象的 key 仅在必要时用引号
	arrowParens: 'always', // 箭头函数，只有一个参数的时候，需不需要括号?
	trailingComma: 'all', // 末尾需不需要逗号?
	// HTML
	htmlWhitespaceSensitivity: 'css', // 根据显示样式决定 html 要不要折行
	// SPECIAL
	insertPragma: false,
	requirePragma: false,
	// RANGE
	rangeStart: 0, // 每个文件格式化的范围是文件的全部内容
	rangeEnd: Infinity,
	endOfLine: 'lf',
}

// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html',
    'js'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "no-console": 2, // 禁用 console
    "no-alert": 2, // 禁用 alert
    "no-irregular-whitespace": 2, //禁止tab、空格之外的非法空白
    "no-unexpected-multiline": 2, //禁止使用令人困惑的多行表达式,一行结束最后使用;或者是- +之类的连接符
    "guard-for-in": 2, // for in 循环必须限制 Object.prototype.hasOwnProperty
    "no-caller": 2, //禁用 arguments.caller 或 arguments.callee
    "no-extend-native": 2, //禁止扩展原生对象
    "no-extra-bind": 2, //禁止不必要的函数绑定 函数中没有使用this时，不需要绑定this
    "no-invalid-this": 1, // 控制this的使用，只能在构造函数【首字母大写】、对象、类中使用
    "no-multi-spaces": [2, {"ignoreEOLComments": true}], //禁止非缩进处出现多个空格 ,但忽略行尾注释前的多个空格 let a =   b; b前空格多了
    "no-multi-str": 2, //禁止多行字符串 \ 可以连接多行字符实现换行，建议使用 '\n' +的组合
    "no-new-wrappers": 2, //禁止原始包装实例 new String new Number的操作不合理，会变成初始化一个对象，而不是对应的初始类型
    "no-throw-literal": 2, //限制可以被抛出的异常 仅仅 抛出(throw) Error 对象本身或者用户自定义的以 Error 对象为基础的异常
    "no-with": 2, //不使用with
    "no-unused-vars": [2, {"args": "none"}], // 未使用的变量定义，参数不校验，参数有可能是可选参数
    "array-bracket-spacing": [2, "never"], //禁止或强制在括号内使用空格, 禁止使用不一致的空格，应该遵守格式 [1, 2, 3],也就是,逗号后面一个空格
    "brace-style": 2, //大括号风格要求 one true brace style 风格如下：
    /*
    if (foo) {
      bar();
    } else {
      baz();
    }
    */
    "camelcase": [1, {"properties": "never"}], // 驼峰变量命名,警告，而且属性名不会要求是驼峰，变量名要求是
    "comma-dangle": [2], //禁止在数组、对象、函数参数最后面添加拖尾逗号
    "comma-spacing": 2, // 逗号后非行尾需要加空格
    "comma-style": 2, //要求逗号放在数组元素、对象属性或变量声明之后，且在同一行 
    "computed-property-spacing": 2, //禁止在计算属性中使用空格 obj[key] ok
    "eol-last": 2, //要求在非空文件末尾至少存在一行空行
    "func-call-spacing": 2, // 函数执行需要紧挨着(括号，alert(1) ok 不要alert  (2)
    "jsx-quotes": 2, //强制所有不包含双引号的 JSX 属性值使用双引号
    "key-spacing": 2, // 对象key之后，冒号前不允许有空格; value前需要有空格
    "keyword-spacing": 0, //要求在关键字之前、之后都至少有一个空格
    "linebreak-style": 2, //强制使用 Unix 换行符： \n
    "new-cap": 2, //要求构造函数首字母大写
    "newline-after-var": 1, // 变量定义后增加空行 warn
    "no-array-constructor": 2, // new Array X 禁用 Array 构造函数
    "no-mixed-spaces-and-tabs": 2, // 禁止混用tab与空格 禁止空格和 tab 的混合缩进
    "no-multiple-empty-lines": [2, {"max": 2}], // 不能有多个空行,最多两行
    "no-new-object": 2,  //禁用 Object 的构造函数
    "no-trailing-spaces": 2, // 行尾不留空格
    "object-curly-spacing": 2, //不允许花括号中有空格
    "one-var-declaration-per-line": 2, // 一个var定义多个变量时每个变量必须换行
    "padded-blocks": [2, "never"], // 其中一条:{}内第一行与最后一行不允许有空行
    "quote-props": [2, "consistent"], //对象的属性名需要统一【 双引号、单引号、不加】三个选一
    "quotes": [2, "single", {"allowTemplateLiterals": true}],
    "semi-spacing": 2, // 分号前不加空格
    "semi": 2, // 该有分号的地方都加分号
    // "sort-keys": 1, //对象的键名需要按照字典序排序
    // "sort-vars": 1, //变量定义按照字典序排序
    "space-before-blocks": 2, // {} 前必须有空格，例如 function() {}
    "space-before-function-paren": [2, "never"], // function 参数前不允许有空格
    "spaced-comment": [2, "always"], // 注释后面//后需要增加空格
    "arrow-parens": [2, "always"], // 要求箭头函数的参数使用圆括号
    "constructor-super": 2, // 派生类中的构造函数必须调用 super()。非派生类的构造函数不能调用 super()。[字面量继承其他类的类就是派生类]
    "generator-star-spacing": [2, "after"], // 约束 generator 函数强制在 * 和函数名之间有空格
    "no-new-symbol": 2, // disallow new operators with the Symbol object 不要new symbol
    "no-this-before-super": 2, // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
    //"no-var": 1, // 要求使用 let 或 const 而不是 var
    //"prefer-rest-params": 1, // require rest parameters instead of arguments
    "prefer-spread": 2, // 要求使用扩展运算符而非 .apply() ,参数在一个数组中时
    "rest-spread-spacing": 2, // rest参数、扩展运算符 和其对应的表达式都不能有空格 ...args
    "yield-star-spacing": [2, "after"], // 强制在 * 和 参数之间有空格 yield* other();
    "no-debugger": "error", // 禁用 debugger
    "no-sequences": "error", // 禁用逗号操作符
    "no-dupe-args": "error", // 禁止 function 定义中出现重名参数
    "no-inner-declarations": "error", // 禁止在嵌套的块中出现 function 声明 ；if等块中声明函数
     "no-unreachable": "error", // 禁止在return、throw、continue 和 break 语句之后出现不可达代码
    "no-octal": "error", // 禁用八进制字面量 0开头的数字
    "no-dupe-keys": "error", // 禁止对象字面量中出现重复的 key
    "block-scoped-var": 2, // if,for内无var定义,可以用let // 强制把变量的使用限制在其定义的作用域范围内
    "indent": [2, 4, {
          "SwitchCase": 1
        }],  // 统一缩进4字符，switch case需要缩进
    "max-nested-callbacks": [2, 5], // 强制回调函数最大嵌套深度 5层
  }
}

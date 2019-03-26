# API Reference

> Return types:
>
> `resolves`: the function is asynchronous and returns a Promise which resolves to the value
>
> `returns`: the function is synchronous and returns the value

## Browser methods

### `start`
_arguments_
  - capabilities (type: `string`)
  - ...arguments (type: `any`)

_resolves_ `this`

_rejects on error_

Starts the browser and all extra commands

For Puppeteer capabilities are added as launch options and arguments to the `args` key of launch options
For Selenium arguments are ignored

### `isReady`
_returns_ `boolean`

Returns true when the browser was started succesfully

### `close`
_resolves_ `void`

Closes the browser and all commands that were started

### `page`
_arguments_
  - url (type: `string`)
  - readyCondition? (type: `string` | `Function`)

_resolves_ `page proxy` (see below)

_rejects on error_

Opens the url on a new webpage in the browser and waits for the readyCondition to become true.

It resolves to a Proxy which returns properties in the following order:
- a `userExtended` property (see configuration options)
- a Webpage property (from tib)
- a Page property (from the BrowserDriver, _Puppeteer only_)
- a BrowserDriver property

If the requested property doesnt exist on any of the internal objects it returns `undefined`

Also see the `webpage:property` hook which is called everytime you access a property through the Proxy

### `setLogLevel`

### `getCapabilities`
_arguments_
  - capabilities? (type `object`)

_returns_ `object`

Returns the current capabilities. If the `capabilities` argument is specified these capabilities are also returned but are not added to the current capabilities.

### `addCapabilities`
_arguments_
  - capabilities (type `object`)

_returns_ `this`

Adds to or sets the current capabilities with the new `capabilities`

### `getCapability`
_arguments_
  - capability (type `string`)

_returns_ `string`

Returns the value for the requested `capability`

### `addCapability`
_arguments_
  - key (type `string`)
  - value (type `string`)

_returns_ `this`

Adds or sets the value of the capability with name `key`

### `setWindow`
_arguments_
  - width (type `number`)
  - height (type `number`)

Sets the window size.

Also used for the Xvfb comamand

### `getBrowser`
_returns_ `string`

Returns the browser name

### `setBrowser`
_arguments_
  - browserName (type `string`)

> Dont call this unless you have to, if you use a browserstring the browser name should already be set correctly

Sets the browser name

### `setHeadless`
_returns_ `this`

If called the browser will be started headless (if supported). Disables the Xvfb command

### `getBrowserVersion`
_returns_ `string`

> this capability is probably only usefull when using a provider or selenium server

Returns the browser version which was set

### `setBrowserVersion`
_arguments_
  - version (type `string`)

_returns_ `this`

> this capability is probably only usefull when using a provider or selenium server

Sets the browser version

### `setOs`
### `setOS`
_arguments_
  - name (type `string`)
  - version (type `string`)

_returns_ `this`

> this capability is probably only usefull when using a provider or selenium server

Sets the os name and os version

```js
browser.setOs('windows', 7)
```

### `setOsVersion`
### `setOSVersion`
_arguments_
  - version (type `string`)

_returns_ `this`

> this capability is probably only usefull when using a provider or selenium server

Sets the os version

```js
browser.setOs('windows') // default
browser.setOsVersion(7)
```

### `setDevice`
_arguments_
  - name (type `string`)

_returns_ `this`

> this capability is probably only usefull when using a provider or selenium server

Sets the name of the device (eg for mobile testing)


## Webpage methods

### getHtml
_resolves_ `string`

The full html of the loaded Webpage

### getElement
_arguments_
  - selector (type: `string`)

_resolves_ `ASTElement`

Retrieves the html from the matched element and parses the returned outerHTML with `htmlCompiler` to return the corresponding `ASTElement`

### getElements
_arguments_
  - selector (type: `string`)

_resolves_ `Array<ASTElement>`

Retrieves the html from matched elements and parses the returned outerHTML with `htmlCompiler` to return an array of the corresponding `ASTElement`s

### getElementCount
_arguments_
  - selector (type: `string`)

_resolves_ `number`

Retrieves the number of elements found

### getElementHtml
_arguments_
  - selector (type: `string`)

_resolves_ `string`

Retrieves the outerHTML for the matched element

### getElementsHtml
_arguments_
  - selector (type: `string`)

_resolves_ `Array<string>`

Retrieves an array with the outerHTML of all matched elements

### getAttribute
_arguments_
  - selector (type: `string`)
  - attribute (type: `string`)

_resolves_ `string`

Retrieves the value of the attribute for the matched element

### getAttributes
_arguments_
  - selector (type: `string`)
  - attribute (type: `string`)

_resolves_ `Array<string>`

Retrieves an array of the attribute values for the matched elements

### getText
_arguments_
  - selector (type: `string`)

_resolves_ `string`

Retrieves the `textContent` for the matched element

### getTexts
_arguments_
  - selector (type: `string`)

_resolves_ `Array<string>`

Retrieves an array with the `textContent` of all matched elements

### clickElement
_arguments_
  - selector (type: `string`)

_resolves_ `void`

Calls click on the matched element

### runScript
_arguments_
  - pageFunction (type: `Function`)
  - ...arguments (type: `any`)

_returns `any`_

Executes the synchronous pageFunction in the loaded webpage context. The pageFunction is parsed to a string using `@babel/parser`, then transpiled with `@babel/core/transform` for the specified browser version<sup>*</sup>. The function is reconstructed on the webpage using `new Function`.
If you need to pass arguments from your test scope to the pageFunction, pass them as additional arguments to runScript. Make sure to only pass serializable variables (e.g. a Function is not).

It returns whatever `pageFunction` returns

<small><sup>*</sup>Please note that the syntax is transpiled but polyfills are not added automatically. Polyfills need to be already loaded on the webpage. In other words, dont use features in your test pageFunctions which you dont also use in production</small>

### runAsyncScript
_arguments_
  - pageFunction (type: `Function`)
  - ...arguments (type: `any`)

_returns `any`_

Does the same as `runScript` but pageFunction can be asynchronous


## Hooks

### `dependencies:load`

Called before any browser dependency is loaded

### `dependencies:loaded`

Called immediately after all browser dependencies are loaded

### `start:before`

Called before the browser is started

### `start:after`
_arguments_
  - driver (type: `object`, the browser driver instance)

> When starting the browser failed this hook will not be called

Called immediately after the browser has started

### `close:before`

Called before the browser is closed

### `close:after`

Called immediately after the browser was closed

### `page:before`

Called before a new browser page is opened

### `page:created`
_arguments_
  - page (type: `object`, the page instance)

Called immediately after a new browser page is instantiated, but before navigation occures<sup>*</sup> and before the wait condition is triggered.

<small><sup>*</sup>On puppeteer, on selenium instantiating and navigating arent separate actions</small>

### `page:after`
_arguments_
  - page (type: `object`, the page instance)

Called immediately after a new browser page was opened

### `webpage.property`
_arguments_
  - property (type: `string`)

Called whenever a property from a page instance is requested.

### `selenium:build:before` _Selenium browsers only_
_arguments_
  - builder (type: `object`, the Selenium builder instance)

Called just before the build is called on the Selenium builder to start the browser

### `selenium:build:options` _Selenium browsers only_
_arguments_
  - options (type: `array`)
  - builder (type: `object`, the Selenium builder instance)

Called just before browser specific options are applied

﻿if (!window.coreUI) {
    window.coreUI = {};
}

window.coreUI = {
    de: {
        DELETE: 46,
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        ESCAPE: 27,
        ARROWLEFT: 37,
        ARROWUP: 38,
        ARROWRIGHT: 39,
        ARROWDOWN: 40,
        SPACE: 32,
        END: 35,
        HOME: 36,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        PAGEUP: 33,
        PAGEDOWN: 34
    },
    fe: {
        DELETE: "Delete",
        BACKSPACE: "Backspace",
        TAB: "Tab",
        ENTER: "Enter",
        ESC: "Escape",
        ARROWLEFT: "ArrowLeft",
        ARROWUP: "ArrowUp",
        ARROWRIGHT: "ArrowRight",
        ARROWDOWN: "ArrowDown",
        SPACE: "Space",
        END: "End",
        HOME: "Home",
        PAGE_UP: "PageUp",
        PAGE_DOWN: "PageDown"
    },
    ge: {
        CTRL: "CTRL",
        ALT: "ALT",
        SHIFT: "SHIFT"
    },
    alert: {
        initialize: (elementId, dotNetHelper) => {
            let alertEl = document.getElementById(elementId);
            if (alertEl == null)
                return;

            alertEl.addEventListener('close.bs.alert', function () {
                dotNetHelper.invokeMethodAsync('bsCloseAlert');
            });
            alertEl.addEventListener('closed.bs.alert', function () {
                dotNetHelper.invokeMethodAsync('bsClosedAlert');
            });

            bootstrap?.Alert?.getOrCreateInstance(alertEl);
        },
        close: (elementId) => {
            let alertEl = document.getElementById(elementId);
            if (alertEl != null)
                bootstrap?.Alert?.getOrCreateInstance(alertEl)?.close();
        },
        dispose: (elementId) => {
            let alertEl = document.getElementById(elementId);
            if (alertEl != null)
                bootstrap?.Alert?.getOrCreateInstance(alertEl)?.dispose();
        }
    },
    autocomplete: {
        initialize: (elementRef, dotNetHelper) => {
            let dropdownToggleEl = elementRef;
            if (dropdownToggleEl == null)
                return;

            dropdownToggleEl.addEventListener('show.bs.dropdown', function () {
                dotNetHelper.invokeMethodAsync('bsShowAutocomplete');
            });
            dropdownToggleEl.addEventListener('shown.bs.dropdown', function () {
                dotNetHelper.invokeMethodAsync('bsShownAutocomplete');
            });
            dropdownToggleEl.addEventListener('hide.bs.dropdown', function () {
                dotNetHelper.invokeMethodAsync('bsHideAutocomplete');
            });
            dropdownToggleEl.addEventListener('hidden.bs.dropdown', function () {
                dotNetHelper.invokeMethodAsync('bsHiddenAutocomplete');
            });

            bootstrap?.Dropdown?.getOrCreateInstance(elementRef);
        },
        show: (elementRef) => {
            if (elementRef != null)
                bootstrap?.Dropdown?.getOrCreateInstance(elementRef)?.show();
        },
        hide: (elementRef) => {
            if (elementRef != null)
                bootstrap?.Dropdown?.getOrCreateInstance(elementRef)?.hide();
        },
        dispose: (elementRef) => {
            if (elementRef != null)
                bootstrap?.Dropdown?.getOrCreateInstance(elementRef)?.dispose();
        },
        focusListItem: (ul, key, startIndex) => {
            if (!ul || startIndex < -1) return;

            let childNodes = ul.getElementsByTagName('LI');

            if (!childNodes || childNodes.length === 0) return;

            if (startIndex === undefined || startIndex === null)
                startIndex = -1;

            let nextSelectedIndex = startIndex;

            if (key === window.blazorBootstrap.fe.ARROWDOWN) {
                if (nextSelectedIndex < childNodes.length - 1)
                    nextSelectedIndex++;
            }
            else if (key === window.blazorBootstrap.fe.ARROWUP) {
                if (nextSelectedIndex > 0 && nextSelectedIndex <= childNodes.length - 1)
                    nextSelectedIndex--;
            }
            else if (key === window.blazorBootstrap.fe.HOME) {
                nextSelectedIndex = 0;
            }
            else if (key === window.blazorBootstrap.fe.END) {
                nextSelectedIndex = childNodes.length - 1;
            }
            else
                return;

            // reset li element focus
            let highlighted = ul.querySelectorAll('.dropdown-item-highlight');
            if (highlighted.length) {
                for (let i = 0; i < highlighted.length; i++) {
                    highlighted[i].classList.remove('dropdown-item-highlight');
                }
            }

            // focus on the next li element
            if (nextSelectedIndex >= 0 && nextSelectedIndex <= childNodes.length - 1) {
                childNodes[nextSelectedIndex].classList.add('dropdown-item-highlight');
                ul.scrollTop = childNodes[nextSelectedIndex].offsetTop;
            }

            return nextSelectedIndex;
        }
    },
    collapse: {
        initialize: (elementId, parent, toggle, dotNetHelper) => {
            let collapseEl = document.getElementById(elementId);
            if (collapseEl == null)
                return;

            collapseEl.addEventListener('show.bs.collapse', (event) => {
                dotNetHelper.invokeMethodAsync('bsShowCollapse');
            });
            collapseEl.addEventListener('shown.bs.collapse', (event) => {
                dotNetHelper.invokeMethodAsync('bsShownCollapse');
            });
            collapseEl.addEventListener('hide.bs.collapse', (event) => {
                dotNetHelper.invokeMethodAsync('bsHideCollapse');
            });
            collapseEl.addEventListener('hidden.bs.collapse', (event) => {
                dotNetHelper.invokeMethodAsync('bsHiddenCollapse');
            });

            let options = { parent: parent, toggle: toggle };
            bootstrap?.Collapse?.getOrCreateInstance(collapseEl, options);
        },
        show: (elementId) => {
            let collapseEl = document.getElementById(elementId);
            if (collapseEl != null)
                bootstrap?.Collapse?.getOrCreateInstance(collapseEl)?.show();
        },
        hide: (elementId) => {
            let collapseEl = document.getElementById(elementId);
            if (collapseEl != null)
                bootstrap?.Collapse?.getOrCreateInstance(collapseEl)?.hide();
        },
        toggle: (elementId) => {
            let collapseEl = document.getElementById(elementId);
            if (collapseEl != null)
                bootstrap?.Collapse?.getOrCreateInstance(collapseEl)?.toggle();
        },
        dispose: (elementId) => {
            let collapseEl = document.getElementById(elementId);
            if (collapseEl != null)
                bootstrap?.Collapse?.getOrCreateInstance(collapseEl)?.dispose();
        }
    },
    confirmDialog: {
        show: (elementId) => {
            let confirmDialogEl = document.getElementById(elementId);
            if (confirmDialogEl != null)
                setTimeout(() => confirmDialogEl.classList.add('show'), 90); // added delay for server

            let bodyEl = document.getElementsByTagName('body');
            if (bodyEl.length > 0)
                bodyEl[0].style['overflow'] = 'hidden';
        },
        hide: (elementId) => {
            let confirmDialogEl = document.getElementById(elementId);
            if (confirmDialogEl != null)
                confirmDialogEl.classList.remove('show');

            let bodyEl = document.getElementsByTagName('body');
            if (bodyEl.length > 0)
                bodyEl[0].style['overflow'] = 'auto';
        }
    },
    currencyInput: {
        initialize: (elementId, isFloat, allowNegativeNumbers, decimalSeperator) => {
            let currencyEl = document.getElementById(elementId);

            currencyEl?.addEventListener('keydown', function (event) {

                switch (event.code) {
                    case "Backspace":
                    case "Tab":
                    case "Enter":
                    case "ArrowLeft":
                    case "ArrowUp":
                    case "ArrowRight":
                    case "ArrowDown":
                    case "Delete":
                        return;
                }

                let validChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

                if (isFloat) {
                    validChars.push(decimalSeperator);
                }

                if (allowNegativeNumbers) {
                    validChars.push('-');
                }

                if (!validChars.includes(event.key))
                    event.preventDefault();
            });

            currencyEl?.addEventListener('beforeinput', function (event) {
                if (event.inputType === 'insertFromPaste' || event.inputType === 'insertFromDrop') {

                    let validChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

                    if (isFloat) {
                        validChars.push(decimalSeperator);
                    }

                    if (allowNegativeNumbers) {
                        validChars.push('-');
                    }

                    if (event.data && event.data.length > 0) {
                        if (blazorBootstrap.hasInvalidChars(event.data, validChars))
                            event.preventDefault();
                    }
                }
            });

            currencyEl?.addEventListener('focusin', function (event) {
                if (currencyEl.dataset.currentValue)
                    currencyEl.value = currencyEl.dataset.currentValue; // assign original value
                else
                    currencyEl.value = ''; // don't assign zero.
            });

            // this event is fired after OnChange event
            currencyEl?.addEventListener('focusout', function (event) {
                // scenario:
                // without changing the value focusout event is triggered
                if (typeof (currencyEl.dataset.currentValue) === 'undefined' || currencyEl.dataset.currentValue === currencyEl.value) {
                    currencyEl.value = currencyEl.dataset.currentFormattedValue; // assign formatted value
                }
            });
        },
        getFormattedValue: (value, locales, options) => {

            let extractedValue = value.toString();
            let parsedValue = Number.parseFloat(extractedValue);

            if (isNaN(parsedValue))
                parsedValue = 0;

            return new Intl.NumberFormat(locales, options).format(parsedValue);
        }
    },
    dateInput: {
        getFormattedValue: (value) => {
            let extractedValue = value.toString();
            if (extractedValue.length === 0)
                return '';

            let isValid = !isNaN(Date.parse(extractedValue));
            if (!isValid)
                return '';

            let _date = new Date(extractedValue);
            return _date.toLocaleDateString();
        },
        setValue: (elementId, value) => {
            document.getElementById(elementId).value = value;
        }
    },
    dropdown: {
        dispose: (elementId) => {
            let dropdownEl = document.getElementById(elementId);
            if (dropdownEl != null)
                bootstrap?.Dropdown?.getOrCreateInstance(dropdownEl)?.dispose();
        },
        hide: (elementId) => {
            let dropdownEl = document.getElementById(elementId);
            if (dropdownEl != null)
                bootstrap?.Dropdown?.getOrCreateInstance(dropdownEl)?.hide();
        },
        initialize: (elementId, dotNetHelper) => {
            let dropdownEl = document.getElementById(elementId);
            if (dropdownEl == null)
                return;

            dropdownEl.addEventListener('hide.bs.dropdown', function () {
                dotNetHelper.invokeMethodAsync('bsHideDropdown');
            });
            dropdownEl.addEventListener('hidden.bs.dropdown', function () {
                dotNetHelper.invokeMethodAsync('bsHiddenDropdown');
            });
            dropdownEl.addEventListener('show.bs.dropdown', function () {
                dotNetHelper.invokeMethodAsync('bsShowDropdown');
            });
            dropdownEl.addEventListener('shown.bs.dropdown', function () {
                dotNetHelper.invokeMethodAsync('bsShownDropdown');
            });

            bootstrap?.Dropdown?.getOrCreateInstance(dropdownEl);
        },
        show: (elementId) => {
            let dropdownEl = document.getElementById(elementId);
            if (dropdownEl != null)
                bootstrap?.Dropdown?.getOrCreateInstance(dropdownEl)?.show();
        },
        toggle: (elementId) => {
            let dropdownEl = document.getElementById(elementId);
            if (dropdownEl != null)
                bootstrap?.Dropdown?.getOrCreateInstance(dropdownEl)?.toggle();
        },
        update: (elementId) => {
            let dropdownEl = document.getElementById(elementId);
            if (dropdownEl != null)
                bootstrap?.Dropdown?.getOrCreateInstance(dropdownEl)?.update();
        }
    },
    grid: {
        checkOrUnCheckAll: (cssSelector, isChecked) => {
            let chkEls = document.querySelectorAll(cssSelector);
            if (chkEls.length === 0)
                return;

            chkEls.forEach((ele, index) => {
                ele.checked = isChecked;
            });
        },
        scroll: (elementId) => {
            let tableEl = document.getElementById(elementId);
            if (tableEl === null)
                return;

            if (tableEl.parentElement.scrollLeft === 0) {
                let colEls = tableEl.querySelectorAll('.freeze-column');
                if (colEls.length === 0)
                    return;

                colEls.forEach((e, i) => {
                    e.classList.remove('freeze-column-active');
                });
            }
            else if (tableEl.parentElement.scrollLeft > 0) {
                let colEls = tableEl.querySelectorAll('.freeze-column');
                if (colEls.length === 0)
                    return;

                colEls.forEach((e, i) => {
                    e.classList.add('freeze-column-active');
                });
            }
        },
        setSelectAllCheckboxState: (elementId, state) => {
            let checkboxEl = document.getElementById(elementId);
            if (checkboxEl != null) {
                if (state === 1) { // checked 
                    checkboxEl.checked = true;
                    checkboxEl.indeterminate = false;
                }
                else if (state === 2) { // unchecked
                    checkboxEl.checked = false;
                    checkboxEl.indeterminate = false;
                }
                else if (state === 3) { // indeterminate 
                    checkboxEl.checked = false;
                    checkboxEl.indeterminate = true;
                }
            }
        },
    },
    modal: {
        initialize: (elementId, useStaticBackdrop, closeOnEscape, dotNetHelper) => {
            let modalEl = document.getElementById(elementId);
            if (modalEl == null)
                return;

            modalEl.addEventListener('show.bs.modal', function () {
                dotNetHelper.invokeMethodAsync('bsShowModal');
            });
            modalEl.addEventListener('shown.bs.modal', function () {
                dotNetHelper.invokeMethodAsync('bsShownModal');
            });
            modalEl.addEventListener('hide.bs.modal', function () {
                dotNetHelper.invokeMethodAsync('bsHideModal');
            });
            modalEl.addEventListener('hidden.bs.modal', function () {
                dotNetHelper.invokeMethodAsync('bsHiddenModal');
            });
            modalEl.addEventListener('hidePrevented.bs.modal', function () {
                dotNetHelper.invokeMethodAsync('bsHidePreventedModal');
            });

            let options = { backdrop: useStaticBackdrop ? 'static' : true, keyboard: closeOnEscape };
            bootstrap?.Modal?.getOrCreateInstance(modalEl, options);
        },
        show: (elementId) => {
            let modalEl = document.getElementById(elementId);
            if (modalEl != null)
                bootstrap?.Modal?.getOrCreateInstance(modalEl)?.show();
        },
        hide: (elementId) => {
            let modalEl = document.getElementById(elementId);
            if (modalEl != null)
                bootstrap?.Modal?.getOrCreateInstance(modalEl)?.hide();
        },
        dispose: (elementId) => {
            let modalEl = document.getElementById(elementId);
            if (modalEl != null)
                bootstrap?.Modal?.getOrCreateInstance(modalEl)?.dispose();
        }
    },
    numberInput: {
        initialize: (elementId, isFloat, allowNegativeNumbers, numberDecimalSeparator) => {
            let numberEl = document.getElementById(elementId);

            numberEl?.addEventListener('keydown', function (event) {
                let invalidChars = ["e", "E", "+"];
                if (!isFloat) {
                    invalidChars.push("."); // restrict '.' for integer types
                    invalidChars.push(numberDecimalSeparator); // restrict ',' for specific culture
                }

                if (!allowNegativeNumbers) {
                    invalidChars.push("-"); // restrict '-'
                }

                if (invalidChars.includes(event.key))
                    event.preventDefault();
            });

            numberEl?.addEventListener('beforeinput', function (event) {
                if (event.inputType === 'insertFromPaste' || event.inputType === 'insertFromDrop') {

                    if (!allowNegativeNumbers) {
                        // restrict 'e', 'E', '+', '-'
                        if (isFloat && /[\e\E\+\-]/gi.test(event.data)) {
                            event.preventDefault();
                        }
                        // restrict 'e', 'E', '.', '+', '-'
                        else if (!isFloat && /[\e\E\.\+\-]/gi.test(event.data)) {
                            event.preventDefault();
                        }
                    }
                    // restrict 'e', 'E', '+'
                    else if (isFloat && /[\e\E\+]/gi.test(event.data)) {
                        event.preventDefault();
                    }
                    // restrict 'e', 'E', '.', '+'
                    else if (!isFloat && /[\e\E\.\+]/gi.test(event.data)) {
                        event.preventDefault();
                    }

                }
            });
        },
        setValue: (elementId, value) => {
            document.getElementById(elementId).value = value;
        }
    },
    offcanvas: {
        initialize: (elementId, useStaticBackdrop, closeOnEscape, isScrollable, dotNetHelper) => {
            let offcanvasEl = document.getElementById(elementId);
            if (offcanvasEl == null)
                return;

            offcanvasEl.addEventListener('show.bs.offcanvas', function () {
                dotNetHelper.invokeMethodAsync('bsShowOffcanvas');
            });
            offcanvasEl.addEventListener('shown.bs.offcanvas', function () {
                dotNetHelper.invokeMethodAsync('bsShownOffcanvas');
            });
            offcanvasEl.addEventListener('hide.bs.offcanvas', function () {
                dotNetHelper.invokeMethodAsync('bsHideOffcanvas');
            });
            offcanvasEl.addEventListener('hidden.bs.offcanvas', function () {
                dotNetHelper.invokeMethodAsync('bsHiddenOffcanvas');
            });

            let options = { backdrop: useStaticBackdrop ? 'static' : true, keyboard: closeOnEscape, scroll: isScrollable };
            bootstrap?.Offcanvas?.getOrCreateInstance(offcanvasEl, options);
        },
        show: (elementId) => {
            let offcanvasEl = document.getElementById(elementId);
            if (offcanvasEl != null)
                bootstrap?.Offcanvas?.getOrCreateInstance(offcanvasEl)?.show();
        },
        hide: (elementId) => {
            let offcanvasEl = document.getElementById(elementId);
            if (offcanvasEl != null)
                bootstrap?.Offcanvas?.getOrCreateInstance(offcanvasEl)?.hide();
        },
        dispose: (elementId) => {
            let offcanvasEl = document.getElementById(elementId);
            if (offcanvasEl != null)
                bootstrap?.Offcanvas?.getOrCreateInstance(offcanvasEl)?.dispose();
        }
    },
    rangeInput: {
        initialize: (elementId, dotNetHelper) => {
            let rangeEl = document.getElementById(elementId);
            if (rangeEl == null)
                return;

            rangeEl.addEventListener("input", (event) => {
                dotNetHelper.invokeMethodAsync('bsOnInput', event.target.value);
            });
        }
    },
    scriptLoader: {
        initialize: (elementId, async, scriptId, source, type, dotNetHelper) => {
            let scriptLoaderEl = document.getElementById(elementId);

            if (source.length === 0) {
                console.error(`Invalid src url.`);
                return;
            }

            let scriptEl = document.createElement('script');

            scriptEl.async = async;

            if (scriptId != null)
                scriptEl.id = scriptId;

            if (source != null)
                scriptEl.src = source;

            if (type != null)
                scriptEl.type = type;

            scriptEl.addEventListener("error", (event) => {
                dotNetHelper.invokeMethodAsync('OnErrorJS', `An error occurred while loading the script: ${source}`);
            });

            scriptEl.addEventListener("load", (event) => {
                dotNetHelper.invokeMethodAsync('OnLoadJS');
            });

            if (scriptLoaderEl != null)
                scriptLoaderEl.appendChild(scriptEl);
        }
    },
    sidebar: {
        initialize: (elementId, dotNetHelper) => {
            window.addEventListener("resize", () => {
                dotNetHelper.invokeMethodAsync('bsWindowResize', window.innerWidth);
            });
        },
        windowSize: () => window.innerWidth
    },
    tabs: {
        initialize: (elementId, dotNetHelper) => {
            let navTabsEl = document.getElementById(elementId);
            if (navTabsEl == null)
                return;

            let triggerTabList = [].slice.call(navTabsEl.querySelectorAll('button.nav-link'));

            triggerTabList.forEach(function (tabEl) {
                tabEl?.addEventListener('show.bs.tab', (event) => {
                    // event.target --> active tab
                    // event.relatedTarget --> previous active tab (if available)
                    dotNetHelper.invokeMethodAsync('bsShowTab', event.target?.id, event.relatedTarget?.id);
                });
                tabEl?.addEventListener('shown.bs.tab', (event) => {
                    // event.target --> active tab
                    // event.relatedTarget --> previous active tab
                    dotNetHelper.invokeMethodAsync('bsShownTab', event.target?.id, event.relatedTarget?.id);
                });
                tabEl?.addEventListener('hide.bs.tab', (event) => {
                    // event.target --> current active tab
                    // event.relatedTarget --> new soon-to-be-active tab
                    dotNetHelper.invokeMethodAsync('bsHideTab', event.relatedTarget?.id, event.target?.id);
                });
                tabEl?.addEventListener('hidden.bs.tab', (event) => {
                    // event.target --> previous active tab
                    // event.relatedTarget --> new active tab
                    dotNetHelper.invokeMethodAsync('bsHiddenTab', event.relatedTarget?.id, event.target?.id);
                });
            });
        },
        initializeNewTab: (tabId, dotNetHelper) => {
            let tabEl = document.getElementById(tabId);
            if (tabEl == null)
                return;

            tabEl?.addEventListener('show.bs.tab', (event) => {
                // event.target --> active tab
                // event.relatedTarget --> previous active tab (if available)
                dotNetHelper.invokeMethodAsync('bsShowTab', event.target?.id, event.relatedTarget?.id);
            });
            tabEl?.addEventListener('shown.bs.tab', (event) => {
                // event.target --> active tab
                // event.relatedTarget --> previous active tab
                dotNetHelper.invokeMethodAsync('bsShownTab', event.target?.id, event.relatedTarget?.id);
            });
            tabEl?.addEventListener('hide.bs.tab', (event) => {
                // event.target --> current active tab
                // event.relatedTarget --> new soon-to-be-active tab
                dotNetHelper.invokeMethodAsync('bsHideTab', event.relatedTarget?.id, event.target?.id);
            });
            tabEl?.addEventListener('hidden.bs.tab', (event) => {
                // event.target --> previous active tab
                // event.relatedTarget --> new active tab
                dotNetHelper.invokeMethodAsync('bsHiddenTab', event.relatedTarget?.id, event.target?.id);
            });
        },
        show: (elementId) => {
            let navTabsEl = document.getElementById(elementId);
            if (navTabsEl != null)
                bootstrap?.Tab?.getOrCreateInstance(navTabsEl)?.show();
        },
        dispose: (elementId) => {
            let navTabsEl = document.getElementById(elementId);
            if (navTabsEl != null)
                bootstrap?.Tab?.getOrCreateInstance(navTabsEl)?.dispose();
        }
    },
    timeInput: {
        setValue: (elementId, value) => {
            document.getElementById(elementId).value = value;
        }
    },
    toasts: {
        show: (elementId, autohide, delay, dotNetHelper) => {
            let toastEl = document.getElementById(elementId);
            if (toastEl == null)
                return;

            toastEl.addEventListener('show.bs.toast', function () {
                dotNetHelper.invokeMethodAsync('bsShowToast');
            });
            toastEl.addEventListener('shown.bs.toast', function () {
                dotNetHelper.invokeMethodAsync('bsShownToast');
            });
            toastEl.addEventListener('hide.bs.toast', function () {
                let _this = this;
                if (_this == null || document.getElementById(_this.id) == null) // when a user is redirected to a different page, the HTML element becomes unavailable.
                    return;
                dotNetHelper.invokeMethodAsync('bsHideToast');
            });
            toastEl.addEventListener('hidden.bs.toast', function () {
                let _this = this;
                if (_this == null || document.getElementById(_this.id) == null) // when a user is redirected to a different page, the HTML element becomes unavailable.
                    return;
                dotNetHelper.invokeMethodAsync('bsHiddenToast');
            });

            let options = { animation: true, autohide: autohide, delay: delay };
            bootstrap?.Toast?.getOrCreateInstance(toastEl, options)?.show();
        },
        hide: (elementId) => {
            let toastEl = document.getElementById(elementId);
            if (toastEl != null)
                bootstrap?.Toast?.getOrCreateInstance(toastEl)?.hide();
        },
        dispose: (elementId) => {
            let toastEl = document.getElementById(elementId);
            if (toastEl != null)
                bootstrap?.Toast?.getOrCreateInstance(toastEl)?.dispose();
        }
    },
    tooltip: {
        initialize: (elementRef) => {
            if (elementRef != null)
                bootstrap?.Tooltip?.getOrCreateInstance(elementRef);
        },
        show: (elementRef) => {
            if (elementRef != null)
                bootstrap?.Tooltip?.getOrCreateInstance(elementRef)?.show();
        },
        update: (elementRef) => {
            if (elementRef != null)
                bootstrap?.Tooltip?.getOrCreateInstance(elementRef)?.update();
        },
        dispose: (elementRef) => {
            if (elementRef != null)
                bootstrap?.Tooltip?.getOrCreateInstance(elementRef)?.dispose();
        }
    },
    treeview: {
        initialize: (elementId, dotNetHelper) => {
            window.addEventListener("resize", () => {
                dotNetHelper.invokeMethodAsync('bsWindowResize', window.innerWidth);
            });
        },
        windowSize: () => window.innerWidth
    },
}
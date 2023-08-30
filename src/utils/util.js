import { UserReadableError } from "../errors/UserReadableError.js";

export class Util {

    //URL

    encoder(url, options = 'e') {
        let encodeTool = {
            e(url){
                return encodeURIComponent(btoa(url));
            },
            d(url) {
                return decodeURIComponent(atob(url));
            } 
        }
        return encodeTool[options](url)
    }

    //FORMS

     getFormFieldsObj (form) {
        let fields = this.createElementArray(form, 'input');
        fields = fields.filter(el => el.value !== 'submit')
        fields = this.elementArrayToObject(fields, 'name');
        return fields;
    }

    clearFormFields(formFields) {
        for (let field in formFields) {
            formFields[field].value = "";
        }
    }
    
     createElementArray(parent, ...elements) {
        if (elements.length === 1 && typeof elements[0] === 'string') {
            return Array.from(parent.querySelectorAll(elements));
        } else {
            let arr = [];
            for (let element of elements) {
                arr.push(element);
            }
            return arr;
        }
    }
    
    
     elementArrayToObject(array, keyAttribute, omitELements) {
        let obj = array.reduce((obj, element) => {
            if (keyAttribute === 'text') {
                let pattern = /\s/g;
                let text = (element.textContent).replace(pattern, '-');
                let key = text;
                obj[key] = element;
            } else {
                obj[element.getAttribute(keyAttribute)] = element;
            }
            return obj;
        }, {})
        if (omitELements) {
            for (let element of omitELements) {
                if (obj[element]) {
                    delete obj[element];
                }
            }
        }
        return obj;
    }
    
    
     getFormData(form) {
        let formData = new FormData(form);
        formData = Object.fromEntries(formData.entries());
        return formData;
    }
    
    
     formValidator(formData, minPasswordLength = 1, rePass = undefined) {
        let isFilled = true;
        let emailPattern = /^[-\w]+@[\w\.]+[^\-\.\,\s\t\n\\\=\@\^\&\%\£\"\!\'\#\~\?\>\<\/\¬\`\;\:]$/g;
        for (let key in formData) {
            if (formData[key] === '') {
                isFilled = false;
                throw new UserReadableError('All fields must be filled!');
                break;
            }
            if (key === 'email') {
                if (!emailPattern.test(formData[key])) {
                    throw new UserReadableError('Please enter a valid email')
                    isFilled = false;
                }
                emailPattern.lastIndex = 0;
            } else if (key === 'password' && formData[key].length < Math.max(1, minPasswordLength)) {
                throw new UserReadableError(`Password must be at least ${minPasswordLength} characters long!`)
                isFilled = false;
            }
        }
        if (rePass && formData[rePass] !== formData.password) {
            isFilled = false;
            throw new UserReadableError('Both passwords must match!')
        }
        return isFilled;
    }

    
    //CSS
    findActiveClass (obj) {
        let result = Object.keys(obj).find(el => obj[el] !== null);
        return obj[result];
    }

    toggleClass (element, classArr) {
        let elementClass = element.className;
        let switchClass = classArr.find(el => el !== elementClass);
        element.className = switchClass;
    }

    toggleSettings(element, settings) {
        for (let entry in settings) {
            if (element.style[entry] === settings[entry].off || element.style[entry] === '') {
                element.style[entry] = settings[entry].on;
            } else {
                element.style[entry] = settings[entry].off;
            }
        }
    }

    addRemoveClass(element, className) {
        if (element.classList.contains(className)) {
            element.classList.remove(className);
        } else {
            element.classList.add(className);
        }
    }

    deleteChildren(...elements) {
        for (let element of elements) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        }
    }

    toggleVisibility(element, displayOption = 'block', off = false) {

        if (off) {
        element.style.display === 'none';
        return
        }

        if (element.style.display === 'none' || element.style.display === '') {
            element.style.display = displayOption;
            return true;
        } else {
            element.style.display = 'none';
            return false;
        }
    }

    //Dates 

    getFullDate() {
        const now = new Date();
        const hours = now.getHours();          // Returns the hours (0-23)
        const minutes = now.getMinutes();      // Returns the minutes (0-59)
        const seconds = now.getSeconds();      // Returns the seconds (0-59)
        const milliseconds = now.getMilliseconds(); 
        
        return {
            fullDateCode: `${now.getDate()}${now.getMonth()}${now.getFullYear()}${hours}${minutes}${seconds}${milliseconds}`,
            time: `${hours}:${minutes}:${seconds}.${milliseconds}`,
            calendarDate: `${now.getDate()} - ${now.getMonth()} - ${now.getFullYear()}`,
            date: now.getDate(),
            month: now.getMonth(),
            year: now.getFullYear(),
            weekday: now.getDay(),
            origin: now.getTime()
        }

    }

}
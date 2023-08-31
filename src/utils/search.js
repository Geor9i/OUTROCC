export class Search {
    constructor(procedures) {
        this.procedures = procedures;
    }

    search(keywords, method = 'label', level = undefined) {
        keywords = typeof keywords === 'string' ? [keywords] : keywords;
        let proceduresArr = Array.from(this.procedures);
        let keyCount = keywords.length;
        let buffer = [];
        for (let procedure of proceduresArr) {
            if (level && level !== procedure.score) {
                continue;
            }
            let procedureLabels = Array.from(procedure.labels).map(el => el.toLowerCase());
            let procedureTitle = [procedure.title.toLowerCase()];
            let counter = keyCount;
            for (let keyword of keywords) {
                keyword = keyword.toLowerCase();
                switch(method) {
                    case'label':
                    if (procedureLabels.includes(keyword)) {
                        counter--;
                    }
                    break;
                    case'title':
                    if (procedureTitle.includes(keyword)) {
                        counter--;
                    }
                }
                
            }
            if(counter === 0) {
                buffer.push(procedure)
            }
        }
        return buffer;
        }
}


// let procedureSearch = new Search(procedures);
// let result = procedureSearch.search(['general'], 'labels');
// result.forEach(el => {
//     console.log(el)
//     // console.log(el.labels)
// })
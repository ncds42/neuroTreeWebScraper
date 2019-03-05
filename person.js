
module.exports = class Person {
    constructor(name, affiliation) {
        this.name = name;
        this.affiliation = affiliation;
        this.parents = [];
        this.children = [];
    }

    addParent (name, title, year, affiliation) {
        if(Boolean(name) && Boolean(title)){
            {
                const parent = {name: name, title: title, year: year, affiliation: affiliation};
                this.parents.push(parent);
            }
        }
    }

    addChild(name, title, year, affiliation) {
        if(Boolean(name) && Boolean(title)){
            const child = {name: name, title: title, year: year, affiliation: affiliation};
            this.children.push(child);
        }
    }
}
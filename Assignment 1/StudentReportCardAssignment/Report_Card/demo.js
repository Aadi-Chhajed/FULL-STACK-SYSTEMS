class Student {
    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log(`Hello ${this.name}`);
    }
    disrespect(){
        console.log(`Bhadwe ${this.name}`)
    }
}

const name = process.argv[3];

const s1 = new Student(name);

s1.greet();
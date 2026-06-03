class Student {
    constructor(name, scores) {
        this.name = name;
        this.scores = scores;
    }

    getAverage() {
        let sum = 0;

        for (let i = 0; i < this.scores.length; i++) {
            sum += this.scores[i];
        }

        return sum / this.scores.length;
    }

    getLetterGrade() {
        const average = this.getAverage();

        // Grade Scale:
        // A = 90+
        // B = 80-89
        // C = 70-79
        // D = 60-69
        // F = Below 60

        if (average >= 90) {
            return "A";
        } else if (average >= 80) {
            return "B";
        } else if (average >= 70) {
            return "C";
        } else if (average >= 60) {
            return "D";
        } else {
            return "F";
        }
    }

    summary() {
        let highest = this.scores[0];
        let lowest = this.scores[0];

        for (let i = 1; i < this.scores.length; i++) {
            if (this.scores[i] > highest) {
                highest = this.scores[i];
            }

            if (this.scores[i] < lowest) {
                lowest = this.scores[i];
            }
        }

        return {
            highest,
            lowest
        };
    }
}

// CLI INPUT


const name = process.argv[2];

const scores = process.argv
    .slice(3)
    .map(Number);


// VALIDATION


if (!name) {
    console.log("Error: Student name is required.");
    process.exit(1);
}

if (scores.length < 3) {
    console.log("Error: At least 3 scores are required.");
    process.exit(1);
}

// CREATE STUDENT

const student = new Student(name, scores);

// PASS / FAIL

const result =
    student.getAverage() >= 60
        ? "PASS"
        : "FAIL";

// ====================
// REMARK FUNCTION
// ====================

function getRemark(grade) {
    switch (grade) {
        case "A":
            return "Excellent";

        case "B":
            return "Very Good";

        case "C":
            return "Good";

        case "D":
            return "Needs Improvement";

        default:
            return "Failing";
    }
}

// ====================
// SCORE BREAKDOWN
// ====================

const [score1, score2, ...remainingScores] =
    student.scores;

// ====================
// REPORT CARD
// ====================

const average =
    student.getAverage().toFixed(1);

const grade =
    student.getLetterGrade();

const stats =
    student.summary();

const remark =
    getRemark(grade);

console.log(`
==================================
         STUDENT REPORT CARD


Name: ${student.name}

Scores: ${student.scores.join(", ")}

Average: ${average}
Grade: ${grade}

Highest Score: ${stats.highest}
Lowest Score: ${stats.lowest}

Result: ${result}
Remark: ${remark}

Score Breakdown:
Score 1: ${score1}
Score 2: ${score2}
Remaining Scores: ${remainingScores.join(", ")}

==================================
`);
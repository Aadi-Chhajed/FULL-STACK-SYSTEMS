/*
RAW IITK QR STRING:

02.240004,1,MEYCIQCnIHcPmD6Pls3CU9oHUU0QxI3hGCoWPvv++A3jsUhL6QIhAIuIPxYe+zYQ26jRY/k610JtCsj+4zXNqbS2CJINrv98.iitkidcard

Roll Number Location:
240004

Explanation:
- Prefix: 02.
- Roll Number: 240004
- Remaining content: digital signature / verification payload
- Suffix: .iitkidcard
*/

function extractRollNumber(qrString) {
  const matches = qrString.match(/\d{6}/g);

  if (!matches) return null;

  const roll = matches.find(num => {
    const n = Number(num);
    return n >= 240001 && n <= 240400;
  });

  return roll || null;
}

function isRegistered(rollNumber) {
  const n = Number(rollNumber);

  return n >= 240001 && n <= 240400;
}

module.exports = {
  extractRollNumber,
  isRegistered
};
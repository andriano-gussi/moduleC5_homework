const stringXML = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const stringJSON = `
{
  "list":[
     {
        "name":"Petr",
        "age":"20",
        "prof":"mechanic"
     },
     {
        "name":"Vova",
        "age":"60",
        "prof":"pilot"
     }
  ]
}
`;

function parseXML(data) {
    const parser = new DOMParser();
    data = parser.parseFromString(data, 'text/xml');
    const nodeList = data.querySelector("list");
    const nodesStudents = nodeList.querySelectorAll("student");
    const result = {
      list: []
    };

    for (item of nodesStudents) {
        const nodeName = item.querySelector("name");
        const attrLang = nodeName.getAttribute("lang");
        const nodeFirst = nodeName.querySelector("first");
        const nodeSecond = nodeName.querySelector("second");
        const nodeAge = item.querySelector("age");
        const nodeProf = item.querySelector("prof");

        const student = {
          name: nodeFirst.textContent + " " + nodeSecond.textContent,
          age: Number(nodeAge.textContent),
          prof: nodeProf.textContent,
          lang: attrLang
        };

        result.list.push(student);
    };
    return result;
}

function parseJSON(data) {
  return JSON.parse(data);
}

console.log("parse XML:", parseXML(stringXML));
console.log("parse JSON:", parseJSON(stringJSON));
import readline from "node:readline/promises";

var studentsNumber = 0;
const studentsDB = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//Validación para campos que deberían ser numéricos o positivos
function isNaNValidation(argument) {
  if (isNaN(argument) || argument < 0 || !argument)
    throw new Error("Introduzca un número válido");
}

//función que contiene la lógica para registrar alumnos
async function registerStudent() {
  const name = await rl.question("Ingrese su nombre: ");
  if (!name || name.trim() == "")
    throw new Error("Introduzca un nombre válido.");

  const edad = Number(await rl.question("Ingrese su edad: "));
  isNaNValidation(edad);

  const nota = Number(await rl.question("Ingrese su nota: "));
  isNaNValidation(nota);

  studentsDB.push([name, edad, nota]);

  const option = await rl.question(
    "Desea continuar? \n'Enter' para continuar\n Escriba 'salir' para cerrar el programa\n",
  );
  if (option.toLowerCase() == "salir") {
    if (studentsDB.length) {
      console.clear();
      showStudents();
    }
    throw new Error("Se cerró el programa");
  }
  console.clear();
}

//función para mostrar los alumnos en los formatos correspondientes
function showStudents() {
  for (let student of studentsDB) {
    console.log(
      `Nombre: ${student[0]}\n Edad: ${student[1]}\n Nota: ${student[2]}`,
    );
  }
  console.log("-----------------------------------------");
  console.log("Estudiantes ordenados por nota");
  console.log("-----------------------------------------");
  studentsDB.sort((a, b) => b[2] - a[2]); //ordenamiento descendente

  for (let student of studentsDB) {
    console.log(
      `Nombre: ${student[0]}\n Edad: ${student[1]}\n Nota: ${student[2]}`,
    );
  }
  console.log("-----------------------------------------");
  console.log("Promedio general de notas");
  console.log("-----------------------------------------");

  let averageGrade = 0;
  for (const student of studentsDB){
    averageGrade+= student[2]
  }

  console.log((averageGrade / studentsDB.length).toFixed(2));
}

async function execCLI() {
  try {
    studentsNumber = Number(
      await rl.question("Cuántos estudiantes desea registrar? \n"),
    );
    isNaNValidation(studentsNumber);

    for (let i = 0; i < studentsNumber; i++) {
      await registerStudent();
      console.clear();
    }

    showStudents();

    rl.close();
    process.exit(0);
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
}

await execCLI();
studentsDB = []
import platform
import subprocess

#Función para limpiar la consola
def clearConsole():
  if platform.system() == "Windows":
    subprocess.run(["cls"], shell=True)
  else:
    subprocess.run(["clear"], shell=True)

def registerStudents():
  name = input("Ingrese su nombre: ")
  edad = int(input("Ingrese su edad: "))
  nota = float(input("Ingrese su nota: "))

  studentsDB.append([name, edad, nota])
  print("Estudiante registrado exitosamente")

def execCLI():
  studentsNumber = int(input("Cuántos estudiantes desea registrar?"))

  #bucle para registrar alumnos
  for i in range(studentsNumber):
    clearConsole()
    registerStudents()

    option = input("Desea continuar?\n 'Enter' para registrar el siguiente alumno\n Escriba 'salir' para cerrar el programa\n")
    if(option.lower() == "salir"):
      break

  clearConsole()
  print("Estudiantes registrados:")
  for student in studentsDB:
    print(student[0])
    
  print("Estudiantes ordenados por nota:")

  studentsDB.sort(key=lambda s: s[2], reverse=True)
  for student in studentsDB:
    print(f'Nombre: {student[0]} --> {student[2]} puntos')

  print(f"El promedio de notas es: {sum(s[2] for s in studentsDB) / len(studentsDB)}")

execCLI()

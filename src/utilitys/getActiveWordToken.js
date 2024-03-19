export const getActiveWordToken = (input, cursorPosition) => {
  // Recuperamos la posicion actual del cursos
  if (cursorPosition === undefined) return undefined;
  // Creamos un array temporal para guardar las palabras
  const words = [];
  // Recorremos el texto y lo separamos por espacios y saltos de linea
  input.split(/[\s\n]/).forEach((word, index) => {
    // Recuperamos la palabra anterior
    const previous = words[index - 1];
    // Calculamos el rango de la palabra
    // Recuperamos el indice inical de la palabra
    const start = index === 0 ? index : previous.range[1] + 1;
    // Recuperamos donde termina la palabra
    const end = start + word.length;
    // Guardamos la palabra y su rango en el texto
    words.push({ word, range: [start, end] });
  });

  // Buscamos enq ue palabra estamos dependiendo de la posicion del cursor
  return words.find(
    ({ range }) => range[0] <= cursorPosition && range[1] >= cursorPosition
  );
};

export type Person = {
    nombre: string;
    apellido: string;
    identificacion: string;
    correo: string;
  };
  
  export type Account = {
    numero: string;
  };
  
  export type Meta = {
    nombre: string;
    monto_objetivo: number;
    fecha_limite: string;
  };
  
  export type Avance = {
    fecha: string;
    monto: number;
    descripcion: string;
    dentro_tiempo: boolean;
  };
  
export interface ThemeColors {
  primary: string;
  bg: string;
  text: string;
  subtext: string;
  navbar: string;
  borders: string;
  info: string;
  error: string;
  roles: { //poder cambiar el color en función del rol del usuario
    [key: string]: string;
  };
}

export const theme: ThemeColors = {
  primary: "#154212", 
  bg: "#f9f9f7",      
  text: "#1a1c1b",  
  subtext: "#42493e", 
  navbar: "#ffffff",
  borders: "#E6E6E1",
  info: "#3b6934",
  error: "#ba1a1a",

  roles: {
    user: "bg-emerald-100 text-emerald-800 border-emerald-200",
    admin: "bg-amber-100 text-amber-800 border-amber-200",
    agricultor: "bg-purple-100 text-purple-800 border-purple-200",
    default: "bg-blue-100 text-blue-800 border-blue-200",
  }
};
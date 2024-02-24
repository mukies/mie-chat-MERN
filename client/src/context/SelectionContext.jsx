import { createContext, useContext, useEffect, useState } from "react";

const SelectionContext = createContext();
// eslint-disable-next-line
const SelectionProvider = ({ children }) => {
  const data = JSON.parse(sessionStorage.getItem("_list"));

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (data) {
      setSelectedUser(data);
    } else {
      setSelectedUser(null);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <SelectionContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </SelectionContext.Provider>
  );
};

// CUSTOM HOOK

const useSelection = () => useContext(SelectionContext);
// eslint-disable-next-line
export { useSelection, SelectionProvider };

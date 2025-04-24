import React from "react";

function UnautorizedPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Acceso No Autorizado</h1>
      <p className="mt-4">No tienes permiso para acceder a esta página.</p>
    </div>
  );
}

export default UnautorizedPage;

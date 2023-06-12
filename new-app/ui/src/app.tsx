import React, { useEffect, useState } from "react";
import useContactsState from "./state/contacts";
import Iota from "./components/marks/Iota";

const shipIota = { aura: "p", data: "~hastuc-dibtux" };
const flagIota = { aura: "f", data: ".y" };
const log: any = async (e: any) => {
  console.log(e);
};

export function App() {
  useEffect(() => {
    useContactsState.getState().fetchAll();
  }, []);
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="max-w-md space-y-6 py-20">
        <h1 className="text-3xl font-bold">Welcome to app</h1>
        <p>Here&apos;s your urbit&apos;s installed apps:</p>
        <ul className="space-y-4">
          <li>
            <h4>Ship Value</h4>
            <Iota iota={shipIota} path="/test" />
          </li>
          <li>
            <h4>Ship Edit</h4>
            <Iota iota={shipIota} onChange={log} path="/test" edit="edit" />
          </li>
          <li>
            <h4>Ship New</h4>
            <Iota iota={shipIota} onChange={log} path="/test" edit="edit" />
          </li>
          <li>
            <h4>Flag Value (TODO: could be prettier)</h4>
            <Iota iota={flagIota} path="/test" />
          </li>
          <li>
            <h4>Flag Edit </h4>
            <Iota iota={flagIota} path="/test" edit="edit" />
          </li>
          <li>
            <h4>Flag New (TODO: wtf does this actually mean)</h4>
            <Iota iota={flagIota} path="/test" edit="edit" />
          </li>
        </ul>
      </div>
    </main>
  );
}

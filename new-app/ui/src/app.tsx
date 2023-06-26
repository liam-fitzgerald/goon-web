import React, { useEffect, useState } from "react";
import useContactsState from "./state/contacts";
import Iota from "./components/marks/Iota";
import Copy from "./components/copy";
import { useGoonStore } from "./state/goon";
import Pour from "./components/Pour";

const shipIota = { aura: "p", data: "~hastuc-dibtux" };
const flagIota = { aura: "f", data: ".y" };
const falseFlagIota = { aura: "f", data: ".n" };
const dateIota = { aura: "da", data: "~2023.6.12..16.53.52..15b7" };
const textIota = { aura: "t", data: "This is some text" };

const log: any = async (e: any) => {
  console.log(e);
};

export function App() {
  useEffect(() => {
    useGoonStore.getState().fetch();
    useContactsState.getState().fetchAll();
  }, []);
  const load = useGoonStore((s) => s.goon);
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="w-[600px] space-y-6 py-20">
        <h1 className="text-3xl font-bold">Welcome to app</h1>
        <p>Goon</p>
        <div>
          <Pour load={load} />
        </div>
        <p>Here&apos;s your urbit&apos;s installed apps:</p>
        <ul className="space-y-4">
          <li>
            <h4>Small Copy</h4>
            <Copy
              size="sm"
              lede="A ship input"
              info="Ship that you would like to initiate a DM with"
              value={
                <Iota iota={shipIota} onChange={log} path="/test" edit="edit" />
              }
            ></Copy>
          </li>
          <li>
            <h4>Medium Copy</h4>
            <Copy
              size="md"
              lede="A ship input"
              info="Ship that you would like to initiate a DM with"
              value={
                <Iota iota={shipIota} onChange={log} path="/test" edit="edit" />
              }
            >
              <Iota iota={textIota} onChange={log} path="/test" edit="edit" />
            </Copy>
          </li>
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
            <Iota iota={shipIota} onChange={log} path="/test" edit="add" />
          </li>
          <li>
            <h4>Flag Value (TODO: could be prettier)</h4>
            <Iota iota={flagIota} path="/test" />
            <Iota iota={falseFlagIota} path="/test" />
          </li>
          <li>
            <h4>Flag Edit </h4>
            <Iota iota={flagIota} path="/test" edit="edit" onChange={log} />
          </li>
          <li>
            <h4>Flag New (TODO: wtf does this actually mean)</h4>
            <Iota iota={flagIota} path="/test" edit="edit" onChange={log} />
          </li>
          <li>
            <h4>Date Value</h4>
            <Iota iota={dateIota} path="/test" />
          </li>
          <li>
            <h4>Date Edit </h4>
            <Iota iota={dateIota} path="/test" edit="edit" onChange={log} />
          </li>
          <li>
            <h4>Date New</h4>
            <Iota iota={dateIota} path="/test" edit="add" onChange={log} />
          </li>
          <li>
            <h4>Text Value</h4>
            <Iota iota={textIota} path="/test" />
          </li>
          <li>
            <h4>Text Edit </h4>
            <Iota iota={textIota} path="/test" edit="edit" onChange={log} />
          </li>
          <li>
            <h4>Text New</h4>
            <Iota iota={textIota} path="/test" edit="add" onChange={log} />
          </li>
        </ul>
      </div>
    </main>
  );
}

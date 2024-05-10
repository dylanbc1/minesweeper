//
// Copyright (c) ZeroC, Inc. All rights reserved.
//
//
// Ice version 3.7.10
//
// <auto-generated>
//
// Generated from file `Mines.ice'
//
// Warning: do not edit this file.
//
// </auto-generated>
//

/* eslint-disable */
/* jshint ignore: start */

(function(module, require, exports)
{
    const Ice = require("ice").Ice;
    const _ModuleRegistry = Ice._ModuleRegistry;
    const Slice = Ice.Slice;

    let services = _ModuleRegistry.module("services");

    services.Cell = class
    {
        constructor(isLandMine = false, value = 0, hide = false, showAll = false)
        {
            this.isLandMine = isLandMine;
            this.value = value;
            this.hide = hide;
            this.showAll = showAll;
        }

        _write(ostr)
        {
            ostr.writeBool(this.isLandMine);
            ostr.writeInt(this.value);
            ostr.writeBool(this.hide);
            ostr.writeBool(this.showAll);
        }

        _read(istr)
        {
            this.isLandMine = istr.readBool();
            this.value = istr.readInt();
            this.hide = istr.readBool();
            this.showAll = istr.readBool();
        }

        static get minWireSize()
        {
            return  7;
        }
    };

    Slice.defineStruct(services.Cell, true, false);

    Slice.defineSequence(services, "CellVectHelper", "services.Cell", true);

    Slice.defineSequence(services, "CellMatHelper", "services.CellVectHelper", false);

    const iceC_services_BoardSerices_ids = [
        "::Ice::Object",
        "::services::BoardSerices"
    ];

    services.BoardSerices = class extends Ice.Object
    {
    };

    services.BoardSericesPrx = class extends Ice.ObjectPrx
    {
    };

    Slice.defineOperations(services.BoardSerices, services.BoardSericesPrx, iceC_services_BoardSerices_ids, 1,
    {
        "initGame": [, , , , [3], [[3], [3], [3]], , , , ],
        "printBoard": [, , , , ["services.CellMatHelper"], , , , , ],
        "selectCell": [, , , , [1], [[3], [3]], , , , ],
        "showAll": [, , , , , [[1]], , , , ]
    });
    exports.services = services;
}
(typeof(global) !== "undefined" && typeof(global.process) !== "undefined" ? module : undefined,
 typeof(global) !== "undefined" && typeof(global.process) !== "undefined" ? require :
 (typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope) ? self.Ice._require : window.Ice._require,
 typeof(global) !== "undefined" && typeof(global.process) !== "undefined" ? exports :
 (typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope) ? self : window));
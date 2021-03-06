---
id: "_interfaces_.reactantaction"
title: "ReactantAction"
sidebar_label: "ReactantAction"
---

## Type parameters

▪ **T**

## Hierarchy

* Action‹string | symbol›

  ↳ **ReactantAction**

## Index

### Properties

* [_inversePatches](_interfaces_.reactantaction.md#optional-_inversepatches)
* [_patches](_interfaces_.reactantaction.md#optional-_patches)
* [_reactant](_interfaces_.reactantaction.md#_reactant)
* [lastState](_interfaces_.reactantaction.md#laststate)
* [method](_interfaces_.reactantaction.md#optional-method)
* [state](_interfaces_.reactantaction.md#state)
* [type](_interfaces_.reactantaction.md#type)

## Properties

### `Optional` _inversePatches

• **_inversePatches**? : *Patch[]*

*Defined in [packages/reactant-module/src/interfaces.ts:69](https://github.com/unadlib/reactant/blob/40f38c4/packages/reactant-module/src/interfaces.ts#L69)*

___

### `Optional` _patches

• **_patches**? : *Patch[]*

*Defined in [packages/reactant-module/src/interfaces.ts:68](https://github.com/unadlib/reactant/blob/40f38c4/packages/reactant-module/src/interfaces.ts#L68)*

___

###  _reactant

• **_reactant**: *typeof actionIdentifier*

*Defined in [packages/reactant-module/src/interfaces.ts:67](https://github.com/unadlib/reactant/blob/40f38c4/packages/reactant-module/src/interfaces.ts#L67)*

___

###  lastState

• **lastState**: *Record‹string, T›*

*Defined in [packages/reactant-module/src/interfaces.ts:66](https://github.com/unadlib/reactant/blob/40f38c4/packages/reactant-module/src/interfaces.ts#L66)*

___

### `Optional` method

• **method**? : *undefined | string*

*Defined in [packages/reactant-module/src/interfaces.ts:64](https://github.com/unadlib/reactant/blob/40f38c4/packages/reactant-module/src/interfaces.ts#L64)*

___

###  state

• **state**: *Record‹string, T›*

*Defined in [packages/reactant-module/src/interfaces.ts:65](https://github.com/unadlib/reactant/blob/40f38c4/packages/reactant-module/src/interfaces.ts#L65)*

___

###  type

• **type**: *string | symbol*

*Inherited from [ReactantAction](_interfaces_.reactantaction.md).[type](_interfaces_.reactantaction.md#type)*

Defined in node_modules/redux/index.d.ts:21

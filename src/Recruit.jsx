import { useLocalStorage } from "@uidotdev/usehooks"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import ArmyGrid from './ArmyGrid';
import DisplayUnit from './DisplayUnit';
import EmptyUnit from './EmptyUnit';
import ViewInventory from "./ViewInventory.jsx";
import useDeck from "./useDeck.jsx"
import { useState, useEffect } from "react";
import {
  initializeDeckBuild,
} from "./battleCalcs";


export default function Recruit() {

    return (
        <p>Recruit</p>

    )
}
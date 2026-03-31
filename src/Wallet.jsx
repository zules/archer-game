import { useLocalStorage } from "@uidotdev/usehooks"

export default function Wallet() {
    // Currency
const [clanCoins, setClanCoins] = useLocalStorage("clanCoins", {
  scarestare: 0,
  secretkeep: 0,
  formstorm: 0,
  watercross: 0,
  beatleap: 0,
  skymind: 0,
  fossilcall: 0,
});

    return (
            <div>
                <p>Scarestare coins: {clanCoins?.scarestare ?? 0}</p>
                <p>Secretkeep coins: {clanCoins?.secretkeep ?? 0}</p>
                <p>Formstorm coins: {clanCoins?.formstorm ?? 0}</p>
                <p>Watercross coins: {clanCoins?.watercross ?? 0}</p>
                <p>Beatleap coins: {clanCoins?.beatleap ?? 0}</p>
                <p>Skymind coins: {clanCoins?.skymind ?? 0}</p>
                <p>Fossilcall coins: {clanCoins?.fossilcall ?? 0}</p>
            </div>
    )
}
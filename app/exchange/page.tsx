import ExchangeForm from "./components/ExchangeForm";
import {ExchangeRateWithButton} from "@/app/exchange/components/ExchangeRateWithButton";
import TabsComponent from "@/app/exchange/components/TabsComponent";
import Info from "@/app/components/Info";

export default function ExchangePage() {

    return (
        <div className="flex flex-col gap-3 2xl:gap-5">
            <ExchangeForm>
                <ExchangeRateWithButton />
            </ExchangeForm>
            <TabsComponent  />
            <Info/>
        </div>
    );
}

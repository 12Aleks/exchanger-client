import ExchangeForm from "./components/ExchangeForm";
import TabsComponent from "@/app/exchange/components/TabsComponent";
import Info from "@/app/components/Info";

export default function ExchangePage() {

    return (
        <div className="flex flex-col gap-3 2xl:gap-5">
            <ExchangeForm />
            <TabsComponent  />
            <Info/>
        </div>
    );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MenuItem {
  name: string;
  descriptions: Record<string, string>;
  price: string;
}

interface MenuCategory {
  id: string;
  labels: Record<string, string>;
  items: MenuItem[];
}

const menuData: MenuCategory[] = [
  {
    id: "koktaily",
    labels: { sk: "Koktaily", en: "Cocktails", hu: "Koktélok", de: "Cocktails" },
    items: [
      {
        name: "Euphoria Sunset",
        descriptions: {
          sk: "Vodka, mango, passion fruit, limetka, prosecco",
          en: "Vodka, mango, passion fruit, lime, prosecco",
          hu: "Vodka, mangó, maracuja, lime, prosecco",
          de: "Wodka, Mango, Passionsfrucht, Limette, Prosecco",
        },
        price: "9.50€",
      },
      {
        name: "Midnight Mojito",
        descriptions: {
          sk: "Tmavý rum, čerstvá mäta, limetka, trstinový cukor",
          en: "Dark rum, fresh mint, lime, cane sugar",
          hu: "Sötét rum, friss menta, lime, nádcukor",
          de: "Dunkler Rum, frische Minze, Limette, Rohrzucker",
        },
        price: "8.00€",
      },
      {
        name: "Golden Negroni",
        descriptions: {
          sk: "Gin, Campari, sweet vermouth, pomarančová kôra",
          en: "Gin, Campari, sweet vermouth, orange peel",
          hu: "Gin, Campari, édes vermut, narancshéj",
          de: "Gin, Campari, süßer Wermut, Orangenschale",
        },
        price: "9.00€",
      },
      {
        name: "Purple Rain",
        descriptions: {
          sk: "Butterfly pea gin, citrón, levanduľový sirup, tonik",
          en: "Butterfly pea gin, lemon, lavender syrup, tonic",
          hu: "Butterfly pea gin, citrom, levendula szirup, tonik",
          de: "Butterfly Pea Gin, Zitrone, Lavendelsirup, Tonic",
        },
        price: "10.00€",
      },
    ],
  },
  {
    id: "whiskey-rum",
    labels: { sk: "Whiskey & Rum", en: "Whiskey & Rum", hu: "Whiskey & Rum", de: "Whiskey & Rum" },
    items: [
      {
        name: "Jack Daniel's",
        descriptions: {
          sk: "Tennessee whiskey, 4cl",
          en: "Tennessee whiskey, 4cl",
          hu: "Tennessee whiskey, 4cl",
          de: "Tennessee Whiskey, 4cl",
        },
        price: "5.00€",
      },
      {
        name: "Jameson",
        descriptions: {
          sk: "Írska whiskey, 4cl",
          en: "Irish whiskey, 4cl",
          hu: "Ír whiskey, 4cl",
          de: "Irischer Whiskey, 4cl",
        },
        price: "4.50€",
      },
      {
        name: "Havana Club 7 Años",
        descriptions: {
          sk: "Kubánsky rum, 4cl",
          en: "Cuban rum, 4cl",
          hu: "Kubai rum, 4cl",
          de: "Kubanischer Rum, 4cl",
        },
        price: "5.50€",
      },
    ],
  },
  {
    id: "vino-sampanske",
    labels: { sk: "Víno & Šampanské", en: "Wine & Champagne", hu: "Bor & Pezsgő", de: "Wein & Champagner" },
    items: [
      {
        name: "Prosecco Brut",
        descriptions: {
          sk: "Talianske šumivé víno, pohár",
          en: "Italian sparkling wine, glass",
          hu: "Olasz pezsgő, pohár",
          de: "Italienischer Schaumwein, Glas",
        },
        price: "5.00€",
      },
      {
        name: "Rosé Sélection",
        descriptions: {
          sk: "Francúzske ružové víno, pohár",
          en: "French rosé wine, glass",
          hu: "Francia rozé bor, pohár",
          de: "Französischer Roséwein, Glas",
        },
        price: "4.50€",
      },
    ],
  },
  {
    id: "pivo",
    labels: { sk: "Pivo", en: "Beer", hu: "Sör", de: "Bier" },
    items: [
      {
        name: "Pilsner Urquell",
        descriptions: {
          sk: "Čapované, 0,5l",
          en: "Draught, 0.5l",
          hu: "Csapolt, 0,5l",
          de: "Vom Fass, 0,5l",
        },
        price: "2.80€",
      },
      {
        name: "Corona Extra",
        descriptions: {
          sk: "Fľaškové, 0,33l",
          en: "Bottled, 0.33l",
          hu: "Üveges, 0,33l",
          de: "Flasche, 0,33l",
        },
        price: "3.50€",
      },
    ],
  },
  {
    id: "nealko",
    labels: { sk: "Nealko", en: "Non-alcoholic", hu: "Alkoholmentes", de: "Alkoholfrei" },
    items: [
      {
        name: "Virgin Mojito",
        descriptions: {
          sk: "Limetka, mäta, trstinový cukor, sóda",
          en: "Lime, mint, cane sugar, soda",
          hu: "Lime, menta, nádcukor, szóda",
          de: "Limette, Minze, Rohrzucker, Soda",
        },
        price: "5.00€",
      },
      {
        name: "Fresh limonáda",
        descriptions: {
          sk: "Citrón, pomaranč, zázvor, med",
          en: "Lemon, orange, ginger, honey",
          hu: "Citrom, narancs, gyömbér, méz",
          de: "Zitrone, Orange, Ingwer, Honig",
        },
        price: "4.00€",
      },
    ],
  },
  {
    id: "speciality",
    labels: { sk: "Špeciality domu", en: "House Specials", hu: "Házi különlegességek", de: "Hausspezialitäten" },
    items: [
      {
        name: "Euphoria Royal",
        descriptions: {
          sk: "Šampanské, zlaté vločky, jahoda, elderflower",
          en: "Champagne, gold flakes, strawberry, elderflower",
          hu: "Pezsgő, aranypehely, eper, bodza",
          de: "Champagner, Goldflocken, Erdbeere, Holunderblüte",
        },
        price: "14.00€",
      },
      {
        name: "Smoky Old Fashioned",
        descriptions: {
          sk: "Bourbon, údený céder, pomarančová esencia, cherry",
          en: "Bourbon, smoked cedar, orange essence, cherry",
          hu: "Bourbon, füstölt cédrus, narancseszencia, cseresznye",
          de: "Bourbon, geräuchertes Zedernholz, Orangenessenz, Kirsche",
        },
        price: "12.00€",
      },
    ],
  },
];

interface MenuTabsProps {
  locale?: string;
}

export default function MenuTabs({ locale = "sk" }: MenuTabsProps) {
  const [activeTab, setActiveTab] = useState("koktaily");

  const activeCategory = menuData.find((c) => c.id === activeTab) ?? menuData[0];

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {menuData.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveTab(category.id)}
            className={`menu-tab ${activeTab === category.id ? "active" : ""}`}
          >
            {category.labels[locale] || category.labels.en}
          </button>
        ))}
      </div>

      {/* Items */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto"
        >
          {activeCategory.items.map((item) => (
            <div key={item.name} className="menu-item">
              <div className="flex-1 min-w-0">
                <h4 className="text-euphoria-cream font-semibold text-base mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                  {item.name}
                </h4>
                <p className="text-euphoria-muted text-sm leading-relaxed">
                  {item.descriptions[locale] || item.descriptions.en}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <span className="text-euphoria-gold font-semibold text-lg" style={{ fontFamily: "var(--font-heading)" }}>
                  {item.price}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

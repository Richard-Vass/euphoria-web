"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wine, Beer, Coffee, GlassWater, Sparkles, Martini } from "lucide-react";

interface MenuItem {
  name: string;
  descriptions: Record<string, string>;
  price: string;
}

interface MenuCategory {
  id: string;
  labels: Record<string, string>;
  icon: string;
  items: MenuItem[];
}

const categoryIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  koktaily: Martini,
  "whiskey-rum": GlassWater,
  "vino-sampanske": Wine,
  pivo: Beer,
  nealko: Coffee,
  speciality: Sparkles,
};

const menuData: MenuCategory[] = [
  {
    id: "koktaily",
    labels: { sk: "Koktaily", en: "Cocktails", hu: "Koktélok", de: "Cocktails" },
    icon: "koktaily",
    items: [
      {
        name: "Euphoria Sunset",
        descriptions: {
          sk: "Vodka, mango, passion fruit, limetka, prosecco",
          en: "Vodka, mango, passion fruit, lime, prosecco",
          hu: "Vodka, mangó, maracuja, lime, prosecco",
          de: "Wodka, Mango, Passionsfrucht, Limette, Prosecco",
        },
        price: "9.50\u20ac",
      },
      {
        name: "Midnight Mojito",
        descriptions: {
          sk: "Tmav\u00fd rum, \u010derstv\u00e1 m\u00e4ta, limetka, trstinov\u00fd cukor",
          en: "Dark rum, fresh mint, lime, cane sugar",
          hu: "S\u00f6t\u00e9t rum, friss menta, lime, n\u00e1dcukor",
          de: "Dunkler Rum, frische Minze, Limette, Rohrzucker",
        },
        price: "8.00\u20ac",
      },
      {
        name: "Golden Negroni",
        descriptions: {
          sk: "Gin, Campari, sweet vermouth, pomaran\u010dov\u00e1 k\u00f4ra",
          en: "Gin, Campari, sweet vermouth, orange peel",
          hu: "Gin, Campari, \u00e9des vermut, narancsh\u00e9j",
          de: "Gin, Campari, s\u00fc\u00dfer Wermut, Orangenschale",
        },
        price: "9.00\u20ac",
      },
      {
        name: "Purple Rain",
        descriptions: {
          sk: "Butterfly pea gin, citr\u00f3n, levandu\u013eov\u00fd sirup, tonik",
          en: "Butterfly pea gin, lemon, lavender syrup, tonic",
          hu: "Butterfly pea gin, citrom, levendula szirup, tonik",
          de: "Butterfly Pea Gin, Zitrone, Lavendelsirup, Tonic",
        },
        price: "10.00\u20ac",
      },
    ],
  },
  {
    id: "whiskey-rum",
    labels: { sk: "Whiskey & Rum", en: "Whiskey & Rum", hu: "Whiskey & Rum", de: "Whiskey & Rum" },
    icon: "whiskey-rum",
    items: [
      {
        name: "Jack Daniel\u2019s",
        descriptions: {
          sk: "Tennessee whiskey, 4cl",
          en: "Tennessee whiskey, 4cl",
          hu: "Tennessee whiskey, 4cl",
          de: "Tennessee Whiskey, 4cl",
        },
        price: "5.00\u20ac",
      },
      {
        name: "Jameson",
        descriptions: {
          sk: "\u00cdrska whiskey, 4cl",
          en: "Irish whiskey, 4cl",
          hu: "\u00cdr whiskey, 4cl",
          de: "Irischer Whiskey, 4cl",
        },
        price: "4.50\u20ac",
      },
      {
        name: "Havana Club 7 A\u00f1os",
        descriptions: {
          sk: "Kub\u00e1nsky rum, 4cl",
          en: "Cuban rum, 4cl",
          hu: "Kubai rum, 4cl",
          de: "Kubanischer Rum, 4cl",
        },
        price: "5.50\u20ac",
      },
    ],
  },
  {
    id: "vino-sampanske",
    labels: { sk: "V\u00edno & \u0160ampansk\u00e9", en: "Wine & Champagne", hu: "Bor & Pezsg\u0151", de: "Wein & Champagner" },
    icon: "vino-sampanske",
    items: [
      {
        name: "Prosecco Brut",
        descriptions: {
          sk: "Talianske \u0161umiv\u00e9 v\u00edno, poh\u00e1r",
          en: "Italian sparkling wine, glass",
          hu: "Olasz pezsg\u0151, poh\u00e1r",
          de: "Italienischer Schaumwein, Glas",
        },
        price: "5.00\u20ac",
      },
      {
        name: "Ros\u00e9 S\u00e9lection",
        descriptions: {
          sk: "Franc\u00fazske ru\u017eov\u00e9 v\u00edno, poh\u00e1r",
          en: "French ros\u00e9 wine, glass",
          hu: "Francia roz\u00e9 bor, poh\u00e1r",
          de: "Franz\u00f6sischer Ros\u00e9wein, Glas",
        },
        price: "4.50\u20ac",
      },
    ],
  },
  {
    id: "pivo",
    labels: { sk: "Pivo", en: "Beer", hu: "S\u00f6r", de: "Bier" },
    icon: "pivo",
    items: [
      {
        name: "Pilsner Urquell",
        descriptions: {
          sk: "\u010capovan\u00e9, 0,5l",
          en: "Draught, 0.5l",
          hu: "Csapolt, 0,5l",
          de: "Vom Fass, 0,5l",
        },
        price: "2.80\u20ac",
      },
      {
        name: "Corona Extra",
        descriptions: {
          sk: "F\u013ea\u0161kov\u00e9, 0,33l",
          en: "Bottled, 0.33l",
          hu: "\u00dcveges, 0,33l",
          de: "Flasche, 0,33l",
        },
        price: "3.50\u20ac",
      },
    ],
  },
  {
    id: "nealko",
    labels: { sk: "Nealko", en: "Non-alcoholic", hu: "Alkoholmentes", de: "Alkoholfrei" },
    icon: "nealko",
    items: [
      {
        name: "Virgin Mojito",
        descriptions: {
          sk: "Limetka, m\u00e4ta, trstinov\u00fd cukor, s\u00f3da",
          en: "Lime, mint, cane sugar, soda",
          hu: "Lime, menta, n\u00e1dcukor, sz\u00f3da",
          de: "Limette, Minze, Rohrzucker, Soda",
        },
        price: "5.00\u20ac",
      },
      {
        name: "Fresh limon\u00e1da",
        descriptions: {
          sk: "Citr\u00f3n, pomaran\u010d, z\u00e1zvor, med",
          en: "Lemon, orange, ginger, honey",
          hu: "Citrom, narancs, gy\u00f6mb\u00e9r, m\u00e9z",
          de: "Zitrone, Orange, Ingwer, Honig",
        },
        price: "4.00\u20ac",
      },
    ],
  },
  {
    id: "speciality",
    labels: { sk: "\u0160peciality domu", en: "House Specials", hu: "H\u00e1zi k\u00fcl\u00f6nlegess\u00e9gek", de: "Hausspezialit\u00e4ten" },
    icon: "speciality",
    items: [
      {
        name: "Euphoria Royal",
        descriptions: {
          sk: "\u0160ampansk\u00e9, zlat\u00e9 vlo\u010dky, jahoda, elderflower",
          en: "Champagne, gold flakes, strawberry, elderflower",
          hu: "Pezsg\u0151, aranypehely, eper, bodza",
          de: "Champagner, Goldflocken, Erdbeere, Holunderbl\u00fcte",
        },
        price: "14.00\u20ac",
      },
      {
        name: "Smoky Old Fashioned",
        descriptions: {
          sk: "Bourbon, \u00faden\u00fd c\u00e9der, pomaran\u010dov\u00e1 esencia, cherry",
          en: "Bourbon, smoked cedar, orange essence, cherry",
          hu: "Bourbon, f\u00fcst\u00f6lt c\u00e9drus, narancseszencia, cseresznye",
          de: "Bourbon, ger\u00e4uchertes Zedernholz, Orangenessenz, Kirsche",
        },
        price: "12.00\u20ac",
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
      <div className="flex flex-wrap justify-center gap-3 mb-12" role="tablist" aria-label="Drink menu categories">
        {menuData.map((category) => {
          const IconComponent = categoryIcons[category.id];
          const isActive = activeTab === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${category.id}`}
              className={`menu-tab relative inline-flex items-center gap-2 ${isActive ? "active" : ""}`}
              style={isActive ? {
                boxShadow: "0 0 20px rgba(212, 175, 55, 0.25), 0 0 40px rgba(212, 175, 55, 0.1), inset 0 0 15px rgba(212, 175, 55, 0.05)",
              } : undefined}
            >
              {isActive && (
                <motion.div
                  layoutId="active-tab-glow"
                  className="absolute inset-0 rounded-[50px]"
                  style={{
                    background: "linear-gradient(135deg, rgba(212, 175, 55, 0.08), rgba(196, 30, 42, 0.06))",
                    border: "1px solid rgba(212, 175, 55, 0.35)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {IconComponent && <IconComponent size={16} className="flex-shrink-0" />}
                {category.labels[locale] || category.labels.en}
              </span>
            </button>
          );
        })}
      </div>

      {/* Items */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          id={`tabpanel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto"
        >
          {activeCategory.items.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="menu-item"
            >
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
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

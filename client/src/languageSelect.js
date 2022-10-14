import React from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import TranslateIcon from "@mui/icons-material/Translate";

const languageMap = {
    en: { label: "English", dir: "ltr", active: true },
    ru: { label: "Русский", dir: "ltr", active: false },
    fr: { label: "Français", dir: "ltr", active: false }
};

const LanguageSelect = () => {
    const i18nextLng_item = localStorage.getItem('i18nextLng');
    var selected;
    if (i18nextLng_item){
        selected = localStorage.getItem("i18nextLng").substring(0, 2) || "en";
    }
    else{
        selected = "en";
    }

    const { t } = useTranslation();

    const [menuAnchor, setMenuAnchor] = React.useState(null);
    React.useEffect(() => {
        document.body.dir = languageMap[selected].dir;
    }, [menuAnchor, selected]);

    return (
        <div className="d-flex justify-content-end align-items-center language-select-root">
            <Button onClick={({ currentTarget }) => setMenuAnchor(currentTarget)}>
                <TranslateIcon />
                {languageMap[selected].label}
                <ArrowDropDown fontSize="small" />
            </Button>
            <Popover
                open={!!menuAnchor}
                anchorEl={menuAnchor}
                onClose={() => setMenuAnchor(null)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
            >
                <div className="languageList">
                    <List>
                        <ListSubheader>{t("select_language")}</ListSubheader>
                        {Object.keys(languageMap)?.map(item => (
                            <ListItem
                                button
                                key={item}
                                onClick={() => {
                                    i18next.changeLanguage(item);
                                    setMenuAnchor(null);
                                }}
                            >
                                {languageMap[item].label}
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Popover>
        </div>
    );
};

export default LanguageSelect;

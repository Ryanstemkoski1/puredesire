import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import RestoreIcon from '@mui/icons-material/Restore';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EditIcon from '@mui/icons-material/Edit';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import HistoryIcon from '@mui/icons-material/History';
import ErrorIcon from '@mui/icons-material/Error';
import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
// export function mainListItems() {
export const mainListItems = (
    <React.Fragment>
        <ListItemButton
            component="a"
            href="/">
            <ListItemIcon sx={{color: "#00998c"}}>
                <HomeIcon/>
            </ListItemIcon>
            <ListItemText primary="Dashboard"/>
        </ListItemButton>
        <ListItemButton
            component="a"
            href="/library">
            <ListItemIcon>
                <LibraryBooksIcon/>
            </ListItemIcon>
            <ListItemText primary="Library"/>
        </ListItemButton>
        <ListItemButton
            component="a"
            href="/recent-purchases">
            <ListItemIcon>
                <HistoryIcon/>
            </ListItemIcon>
            <ListItemText primary="Recent Purchases"/>
        </ListItemButton>
        <ListItemButton
            component="a"
            href="/credits">
            <ListItemIcon>
                <LocalOfferIcon/>
            </ListItemIcon>
            <ListItemText primary="Credits"/>
        </ListItemButton>
        <ListItemButton
            component="a"
            href="/group">
            <ListItemIcon>
                <PeopleAltOutlinedIcon/>
            </ListItemIcon>
            <ListItemText primary="Groups"/>
        </ListItemButton>
        <ListItemButton
            component="a"
            href="/notebooks">
            <ListItemIcon>
                <EditIcon/>
            </ListItemIcon>
            <ListItemText primary="Notebooks"/>
        </ListItemButton>
        <ListItemButton
            component="a"
            href="/assessments">
            <ListItemIcon>
                <AssignmentOutlinedIcon/>
            </ListItemIcon>
            <ListItemText primary="Assessments"/>
        </ListItemButton>
    </React.Fragment>
);

export const mainListItemsAdmin = (
    <React.Fragment>
        <ListItemButton
            component="a"
            href="/">
            <ListItemIcon sx={{color: "#00998c"}}>
                <HomeIcon/>
            </ListItemIcon>
            <ListItemText primary="Dashboard"/>
        </ListItemButton>
        <ListItemButton
            component="a"
            href="/workbook">
            <ListItemIcon>
                <HorizontalSplitIcon/>
            </ListItemIcon>
            <ListItemText primary="Digital Library"/>
        </ListItemButton>
        <ListItemButton
            component="a"
            href="/user">
            <ListItemIcon>
                <PersonOutlineIcon/>
            </ListItemIcon>
            <ListItemText primary="Users"/>
        </ListItemButton>
        <ListItemButton
            component="a"
            href="/group">
            <ListItemIcon>
                <PeopleAltOutlinedIcon/>
            </ListItemIcon>
            <ListItemText primary="Groups"/>
        </ListItemButton>
        <ListItemButton
            component="a"
            href="/disclaimers">
            <ListItemIcon>
                <ErrorIcon/>
            </ListItemIcon>
            <ListItemText primary="Disclaimers"/>
        </ListItemButton>
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        {/*<ListSubheader component="div" inset>*/}
        {/*    Saved reports*/}
        {/*</ListSubheader>*/}
        {/*<ListItemButton>*/}
        {/*    <ListItemIcon>*/}
        {/*        <AssignmentIcon />*/}
        {/*    </ListItemIcon>*/}
        {/*    <ListItemText primary="Current month" />*/}
        {/*</ListItemButton>*/}
        {/*<ListItemButton>*/}
        {/*    <ListItemIcon>*/}
        {/*        <AssignmentIcon />*/}
        {/*    </ListItemIcon>*/}
        {/*    <ListItemText primary="Last quarter" />*/}
        {/*</ListItemButton>*/}
        {/*<ListItemButton>*/}
        {/*    <ListItemIcon>*/}
        {/*        <AssignmentIcon />*/}
        {/*    </ListItemIcon>*/}
        {/*    <ListItemText primary="Year-end sale" />*/}
        {/*</ListItemButton>*/}
    </React.Fragment>
);
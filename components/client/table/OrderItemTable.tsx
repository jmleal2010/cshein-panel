'use client'
import * as React from 'react';
import Image from 'next/image'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import {routes} from "@/config/consts";
import {useRouter} from "next/navigation";
import moment from "moment";
import {Order as OrderT} from '@/interfaces/index'
import Avatar from "@mui/joy/Avatar";


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string  },
) => number {
  return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number):OrderT[] {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]) as OrderT[];
}

function RowMenu({onView}: {onView: ()=>void}) {
  return (
      <Dropdown>
        <MenuButton
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
        >
          <MoreHorizRoundedIcon />
        </MenuButton>
        <Menu size="sm" sx={{ minWidth: 140 }}>
          <MenuItem>Editar</MenuItem>
          <MenuItem onClick={()=>onView()}>Ver</MenuItem>
          <Divider />
          <MenuItem color="danger">Delete</MenuItem>
        </Menu>
      </Dropdown>
  );
}

export default function OrderItemTable({rows}: any) {

  const [order, setOrder] = React.useState<Order>('desc');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState(false);

  /*Hooks*/
  const router = useRouter();

  /*Functions*/
  const onViewOrder = (id: string) => {

    router.push(`${routes.orders}/${id}`)
  };
  return (
      <React.Fragment>
        <Sheet
            className="SearchAndFilters-mobile"
            sx={{
              display: { xs: 'flex', sm: 'none' },
              my: 1,
              gap: 1,
            }}
        >
          <Input
              size="sm"
              placeholder="Search"
              startDecorator={<SearchIcon />}
              sx={{ flexGrow: 1 }}
          />
          <IconButton
              size="sm"
              variant="outlined"
              color="neutral"
              onClick={() => setOpen(true)}
          >
            <FilterAltIcon />
          </IconButton>
          <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
              <ModalClose />
              <Typography id="filter-modal" variant="h2">
                Filters
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

                <Button color="primary" onClick={() => setOpen(false)}>
                  Submit
                </Button>
              </Sheet>
            </ModalDialog>
          </Modal>
        </Sheet>
        <Box
            className="SearchAndFilters-tabletUp"
            sx={{
              borderRadius: 'sm',
              py: 2,
              display: { xs: 'none', sm: 'flex' },
              flexWrap: 'wrap',
              gap: 1.5,
              '& > *': {
                minWidth: { xs: '120px', md: '160px' },
              },
            }}
        >
          <FormControl sx={{ flex: 1 }} size="sm">
            <FormLabel>Search for order</FormLabel>
            <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />} />
          </FormControl>

        </Box>
        <Sheet
            className="OrderTableContainer"
            variant="outlined"
            sx={{
              display: { xs: 'none', sm: 'initial' },
              width: '100%',
              borderRadius: 'sm',
              flexShrink: 1,
              overflow: 'auto',
              minHeight: 0,
            }}
        >
          <Table
              aria-labelledby="tableTitle"
              stickyHeader
              hoverRow
              sx={{
                '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
                '--Table-headerUnderlineThickness': '1px',
                '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
                '--TableCell-paddingY': '4px',
                '--TableCell-paddingX': '8px',
              }}
          >
            <thead>
            <tr>
              <th style={{width: 120, padding: '12px 6px'}}>
                  Ver producto
              </th>
              <th style={{width: 140, padding: '12px 6px'}}>Nombre</th>
              <th style={{width: 140, padding: '12px 6px'}}>Tamanno</th>
              <th style={{width: 140, padding: '12px 6px'}}>Precio</th>
              <th style={{width: 140, padding: '12px 6px'}}>Descuentos</th>
            </tr>
            </thead>
            <tbody>
            {stableSort(rows, getComparator(order, 'id')).map((row: OrderT| any,index: number) => (
                <tr key={row.id}>
                 <td >
                     <div style={{textAlign: 'center', margin: '0 auto', display: "flex", flexDirection: 'column', alignItems: 'center', marginTop: 2, justifyContent: 'center'}}>
                         <Avatar  component="image" src={row.image} alt={row.name} width={60} height={60} className="cshein-avatar" />
                         <Link href={row.link} > <Typography variant="caption">Ver producto</Typography></Link>
                     </div>

                 </td>
                  <td>
                    <Typography variant="body2">{row.name}</Typography>
                  </td>
                  <td>
                    <Typography variant="body2">{row.size}</Typography>
                  </td>
                  <td>
                    <Typography variant="body2">{row.price}</Typography>
                  </td>
                  <td>
                    <Typography variant="body2">{row.discount}</Typography>
                  </td>
                </tr>
            ))}
            </tbody>
          </Table>
        </Sheet>
        <Box
            className="Pagination-laptopUp"
            sx={{
              pt: 2,
              gap: 1,
              [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
        >
          <Button
              size="small"
              variant="outlined"
              color="secondary"
          >
            Previous
          </Button>

          <Box sx={{ flex: 1 }} />
          {['1', '2', '3', '…', '8', '9', '10'].map((page) => (
              <IconButton
                  key={page}
                  size="sm"
                  variant={Number(page) ? 'outlined' : 'plain'}
                  color="neutral"
              >
                {page}
              </IconButton>
          ))}
          <Box sx={{ flex: 1 }} />

          <Button
              size="small"
              variant="outlined"
              color="secondary"
          >
            Next
          </Button>
        </Box>
      </React.Fragment>
  );
}

import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  TableContainer,
  Box,
  Button,
  Switch,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogFooter,
  AlertDialog,
  useColorModeValue,
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy } from 'react-table';
import { store } from '../../../store/store';
import 'react-data-table-component-extensions/dist/index.css';
import { deletePerfilPersona } from '../../../actions/perfilPersona'; 

export const Tabla = () => {
  const data = store.getState().perfilPersona.rows;
  const [openedit, setOpenEdit] = React.useState(false);
  const [opendelete, setOpenDelete] = React.useState(false);
  const dispatch = useDispatch();

  const [indice, setIndice] = useState({
    idPerfilPersona: null,
    perfil: '',
    descripcion: '',
    activo: "",
  });

  console.log(data)

  const handleClickOpenEdit = index => {
    setIndice(index);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

const handleDeletePerfilPersona = ( idPerfilPersona ) =>{
    dispatch( deletePerfilPersona( idPerfilPersona ) )
    .then( () => {
      handleCloseDelete(true);
      console.log("perfilPersona eliminado");
    }).catch(e => {
      console.log(e)
      handleCloseDelete(true);
    });
}

  const handleClickOpenDelete = index => {
    setIndice(index);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'idPerfilPersona',
      },
      {
        Header: 'Perfil',
        accessor: 'perfil',
      },
      {
        Header: 'Activo',
        accessor: 'activo',
      },
      {
        Header: 'Accion',
        accessor: (originalRow) => (
          <div>
              {/* <button onClick={() => handleEdit(originalRow)}>Edit</button>
              <button onClick={() => handleDelete(originalRow)}>Delete</button> */}
              <Switch
              colorScheme="red"
              mr={2}
              isChecked={originalRow.activo === "S"}
              onChange={() => handleClickOpenDelete(originalRow.idPerfilPersona)}
              />
            <Button
              onClick={() => handleClickOpenEdit(originalRow.idPerfilPersona)}
              size={'xs'}
              colorScheme={'blue'}
            >
              Editar
            </Button>
          </div>
       ),
       id: 'action',
        // Cell: ({row}) => (
        //   <div>
        //     <Switch
        //     colorScheme="red"
        //     mr={2}
        //     isChecked={row.activo === "S"}
        //     onChange={() => handleClickOpenDelete(row.idPerfilPersona)}
        //     />
        //     <Button
        //       onClick={() => handleClickOpenEdit(row.idPerfilPersona)}
        //       size={'xs'}
        //       colorScheme={'blue'}
        //     >
        //       Editar
        //     </Button>
        //   </div>
        // )
      }
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <Box  borderWidth='1px' borderRadius='lg' overflow='hidden' bg={useColorModeValue('white', 'gray.900')}>
      <TableContainer>
        <Table {...getTableProps()}>
          <Thead>
            {headerGroups.map(headerGroup => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    isNumeric={column.isNumeric}
                  >
                    {column.render('Header')}
                    <chakra.span pl="4">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <TriangleDownIcon aria-label="sorted descending" />
                        ) : (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <Td
                      {...cell.getCellProps()}
                      isNumeric={cell.column.isNumeric}
                    >
                      {cell.render('Cell')}

                          {/* -------------------- ELIMINAR ------------------- */}
                          <AlertDialog isOpen={opendelete} onClose={handleCloseDelete}>
                            <AlertDialogOverlay>
                              <AlertDialogContent>
                                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                  Anular Perfil
                                </AlertDialogHeader>

                                <AlertDialogBody>Está seguro de anular?</AlertDialogBody>

                                <AlertDialogFooter>
                                  <Button onClick={handleCloseDelete}>Cancelar</Button>
                                  <Button onClick={() => handleDeletePerfilPersona(row.idPerfilPersona)} colorScheme="red" ml={3}>
                                    Si
                                  </Button>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialogOverlay>
                          </AlertDialog>
{/* 
                    <AlertDialog isOpen={opendelete} onClose={handleCloseDelete}>
                      <AlertDialogOverlay>
                        <AlertDialogContent>
                          <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Anular Perfil
                          </AlertDialogHeader>

                          <AlertDialogBody>Está seguro de anular?</AlertDialogBody>

                          <AlertDialogFooter>
                            <Button onClick={handleCloseDelete}>Cancelar</Button>
                            <Button onClick={() => handleDeletePerfilPersona(row.original.idPerfilPersona)} colorScheme="red" ml={3}>
                              Si
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog> */}

                    </Td>
                    

                  ))}
                  <Td>
                  {/* <Switch
                    colorScheme="red"
                    mr={2}
                    isChecked={row.activo === 'S'}
                    onChange={() => handleClickOpenDelete(row.idPerfilPersona)}
                  />
                    <Button
                      onClick={() => handleClickOpenEdit(row.idPerfilPersona)}
                      size={'xs'}
                      colorScheme={'blue'}
                    >
                      Editar
                    </Button> */}
                    
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

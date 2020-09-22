/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;  
* Projeto comercial Chat Comercial;
*/
import React from 'react';
import { Divider as ChakraDivider, Grid } from '@chakra-ui/core'

const Divider = () => {
    return (
        <Grid
            gridTemplateColumns="1fr 1fr"
            columnGap={12}
            opacity={0.4}
        >
            <ChakraDivider marginY={3} />
            <ChakraDivider marginY={3} />
        </Grid>
    );
}

export default Divider;
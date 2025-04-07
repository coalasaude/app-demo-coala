import { FC, useMemo, useState } from 'react'
import { Tabs, Tab, Typography, Table, TableBody, TableCell, TableHead } from '@mui/material'
import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import dayjs from 'dayjs'

import { CTableRow } from '@/v3/presentation/newComponents/atoms/CTableRow/CTableRow'
import Link from '@/v3/presentation/components/Link'
import { IndicationStatus, RedeemStatus } from '@/v3/domain/Indication'
import { CSelectControlled } from '@/components/Forms'
import { NotFound } from '@/v3/presentation/components/NotFound'

import { useIndicationContext } from '../../contexts/indication.provider'

import {
  StyledFilterContainer,
  StyledIndicationAreaCard,
  StyledIndicationAreaContent,
  StyledInputContainer,
  StyledList,
  StyledRulesContainer,
  StyledTextField,
  StyledTitle,
} from './styles'

const managerStatusMap: Record<IndicationStatus, string> = {
  PENDING: 'Em análise',
  VALID: 'Válida',
  INVALID: 'Desaprovada',
}

const statusMap: Record<IndicationStatus, string> = {
  PENDING: 'Pendente',
  VALID: 'Validada',
  INVALID: 'Invalidada',
}

const redeemStatusMap: Record<RedeemStatus, string> = {
  AVAILABLE: 'Disponível',
  RECEIVED: 'Recebido',
  REQUESTED: 'Solicitado',
}

const ManagerIndicationListing: FC = ({ ...props }) => {
  const { indications } = useIndicationContext()
  if (indications.length === 0) return <NotFound />

  return (
    <Table {...props}>
      <TableHead>
        <CTableRow>
          <TableCell>Escola</TableCell>
          <TableCell align='center'>Status</TableCell>
          <TableCell align='right'>Resgate</TableCell>
        </CTableRow>
      </TableHead>

      <TableBody>
        {indications.map((indication, index) => (
          <CTableRow key={index}>
            <TableCell>{indication.fantasyName}</TableCell>
            <TableCell
              align='center'
              sx={{
                color:
                  indication.status === IndicationStatus.PENDING ? '#FF6332 !important' : undefined,
              }}
            >
              {managerStatusMap[indication.status]}
            </TableCell>
            <TableCell
              align='right'
              sx={{
                color:
                  indication.redeemStatus === RedeemStatus.AVAILABLE
                    ? '#03BE7F !important'
                    : undefined,
              }}
            >
              {redeemStatusMap[indication.redeemStatus!] || '-'}
            </TableCell>
          </CTableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const AdminIndicationRanking: FC = ({ ...props }) => {
  const { indicationRanking } = useIndicationContext()
  if (indicationRanking?.length === 0) return <NotFound />
  return (
    <Table {...props}>
      <TableHead>
        <CTableRow>
          <TableCell align='left'>Usuário</TableCell>
          <TableCell align='right'>indicações válidas</TableCell>
        </CTableRow>
      </TableHead>
      <TableBody>
        {indicationRanking?.map((item, index) => (
          <CTableRow key={index}>
            <TableCell>
              #{index + 1} {item.user.getFormattedName()}
            </TableCell>
            <TableCell align='right'>{item.count}</TableCell>
          </CTableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const AdminIndicationListing: FC = ({ ...props }) => {
  const formMethods = useForm()
  const { indications, indicationListFilter, setIndicationListFilter } = useIndicationContext()
  const { push } = useRouter()
  if (indications.length === 0) return <NotFound />

  return (
    <div>
      <StyledFilterContainer>
        <FormProvider {...formMethods}>
          <StyledInputContainer>
            <StyledTextField
              name='queryFilter'
              label='Buscar por usuário e email'
              placeholder='Digite para pesquisar por usuário e email'
              value={indicationListFilter.user}
              onChange={(e) => {
                setIndicationListFilter({ ...indicationListFilter, user: e.target.value })
              }}
            />
          </StyledInputContainer>

          <StyledInputContainer>
            <CSelectControlled
              key='statusFilter'
              name='statusFilter'
              label='Filtro'
              options={[
                { value: IndicationStatus.PENDING, label: 'Pendente' },
                { value: IndicationStatus.VALID, label: 'Validada' },
                { value: IndicationStatus.INVALID, label: 'Invalidado' },
              ]}
              onChange={(e) => {
                setIndicationListFilter({
                  ...indicationListFilter,
                  status: (e.target.value as IndicationStatus) || undefined,
                })
              }}
            />
          </StyledInputContainer>
        </FormProvider>
      </StyledFilterContainer>

      <Table {...props}>
        <TableHead>
          <CTableRow>
            <TableCell align='left'>Usuário</TableCell>
            <TableCell align='left'>Escola</TableCell>
            <TableCell align='right'>Status</TableCell>
          </CTableRow>
        </TableHead>
        <TableBody>
          {indications.map((indication, index) => (
            <CTableRow
              key={`admin-table-indication-${index}`}
              onClick={() => push(`indication/${indication.id}`)}
            >
              <TableCell>
                <Typography variant='caption' component='p'>
                  {indication.managerName}
                </Typography>
                <Typography variant='caption' component='p'>
                  {indication.managerEmail}
                </Typography>
              </TableCell>
              <TableCell>{indication.fantasyName}</TableCell>
              <TableCell
                align='right'
                sx={{
                  color: indication.status === 'PENDING' ? '#FF6332 !important' : undefined,
                }}
              >
                {statusMap[indication.status]}
              </TableCell>
            </CTableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

const adminRedeemStatusMap: Record<RedeemStatus, any> = {
  AVAILABLE: {
    label: 'Validado',
  },
  RECEIVED: {
    label: 'Resgatado',
    color: '#03BE7F !important',
  },
  REQUESTED: {
    label: 'Pendente',
    color: '#FF6332 !important',
  },
}

const AdminIndicationRedeem: FC = ({ ...props }) => {
  const formMethods = useForm()
  const { redeems, redeemFilter, setRedeemFilter } = useIndicationContext()
  if (redeems.length === 0) return <NotFound />

  return (
    <div>
      <StyledFilterContainer>
        <FormProvider {...formMethods}>
          <StyledInputContainer>
            <StyledTextField
              placeholder='Digite para pesquisar por usuário e email'
              name='queryFilter'
              label='Buscar por usuário e email...'
              value={redeemFilter.user}
              onChange={(e) => {
                setRedeemFilter({ ...redeemFilter, user: e.target.value })
              }}
            />
          </StyledInputContainer>

          <StyledInputContainer>
            <CSelectControlled
              key='statusFilter'
              name='statusFilter'
              label='Filtro'
              options={[
                { value: RedeemStatus.AVAILABLE, label: 'Validado' },
                { value: RedeemStatus.RECEIVED, label: 'Resgatado' },
                { value: RedeemStatus.REQUESTED, label: 'Pendente' },
              ]}
              onChange={(e) => {
                setRedeemFilter({
                  ...redeemFilter,
                  status: (e.target.value as IndicationStatus) || undefined,
                })
              }}
            />
          </StyledInputContainer>
        </FormProvider>
      </StyledFilterContainer>

      <Table {...props}>
        <TableHead>
          <CTableRow>
            <TableCell align='left'>Usuário</TableCell>
            <TableCell align='center'>Data da solicitação</TableCell>
            <TableCell align='right'>Valor</TableCell>
          </CTableRow>
        </TableHead>

        <TableBody>
          {redeems.map((indication, index) => (
            <CTableRow key={index}>
              <TableCell>
                <Typography variant='caption' component='p'>
                  {indication.managerName}
                </Typography>
                <Typography variant='caption' component='p'>
                  {indication.managerEmail}
                </Typography>
              </TableCell>
              <TableCell align='center'>
                {dayjs(indication.updatedAt).format('DD/mm/yyyy')}
              </TableCell>
              <TableCell
                align='right'
                sx={{
                  color: adminRedeemStatusMap[indication.redeemStatus!]?.color,
                }}
              >
                {adminRedeemStatusMap[indication.redeemStatus!]?.label}
              </TableCell>
            </CTableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

const IndicationRules: FC = ({ ...props }) => {
  const ruleList = useMemo(
    () => [
      {
        text: 'Dados válidos , como e-mail e telefone, de uma pessoa da gestão da escola. É importante que nossa equipe consiga contatá-la.',
      },
      {
        text: 'Ser uma escola com as seguintes características:',
        subList: [
          {
            text: 'Privada;',
          },
          {
            text: 'Oferece ensino infantil e/ou fundamental;',
          },
          {
            text: 'Tem ao menos 150 alunos ativos;',
          },
          {
            text: 'Mensalidade igual ou acima de R$400,00.',
          },
        ],
      },
      {
        text: 'Não ter sido indicada por outra pessoa previamente, não estar em negociação com o nosso time ou fazer parte de uma rede de ensino que já possui parceria com a Coala.',
      },
    ],
    [],
  )

  return (
    <StyledRulesContainer {...props}>
      <StyledTitle variant='h4' component='h3'>
        Regras do Programa de Indicação:
      </StyledTitle>

      <Typography variant='body2'>
        Para a sua indicação ser válida ela precisa atender a todas condições de uma possível escola
        interessada, confira abaixo quais são elas:
      </Typography>

      <StyledList>
        {ruleList.map((rule, index) => (
          <li key={index}>
            {rule.text}
            {rule.subList && (
              <ul>
                {rule.subList.map((subRule, subIndex) => (
                  <li key={subIndex}>{subRule.text}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </StyledList>

      <div>
        <Typography variant='body2'>Saiba mais em nosso regulamento:</Typography>
        <Link
          href='https://ajuda.coalasaude.com.br/pt-BR/articles/8160203-programa-de-indicacoes-regulamento-da-campanha'
          target='_blank'
        >
          Regulamento - Programa de indicações
        </Link>
      </div>
    </StyledRulesContainer>
  )
}

const IndicationsArea: FC = () => {
  const [value, setValue] = useState(0)
  const { isAdmin } = useIndicationContext()
  const tabs = useMemo(
    () => ({
      MANAGER: [
        {
          label: 'Indicações',
          content: <ManagerIndicationListing key='indication-listing' />,
        },
        {
          label: 'Regras',
          content: <IndicationRules key='indication-rules' />,
        },
      ],
      ADMIN: [
        {
          label: 'Ranking',
          content: <AdminIndicationRanking key='indication-ranking' />,
        },
        {
          label: 'Resgates',
          content: <AdminIndicationRedeem key='indication-redeem' />,
        },
        {
          label: 'Indicações',
          content: <AdminIndicationListing key='indication-listing' />,
        },
      ],
    }),
    [],
  )
  const key: keyof typeof tabs = isAdmin ? 'ADMIN' : 'MANAGER'

  return (
    <StyledIndicationAreaCard>
      <StyledTitle>{isAdmin ? 'Indicações e resgate de prêmios' : 'Minhas indicações'}</StyledTitle>

      <Tabs value={value} onChange={(_, newValue) => setValue(newValue)}>
        {tabs[key].map((tab, index) => (
          <Tab key={index} label={tab.label} id={`indication-tab-${index}`} />
        ))}
      </Tabs>

      <StyledIndicationAreaContent>{tabs[key]?.[value]?.content}</StyledIndicationAreaContent>
    </StyledIndicationAreaCard>
  )
}

export default IndicationsArea

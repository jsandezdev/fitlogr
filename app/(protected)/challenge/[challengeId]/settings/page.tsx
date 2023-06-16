import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { PageHeader } from '@/components/PageHeader'
import { ProtectedPage } from '@/components/ProtectedPage'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { authOptions } from '@/lib/auth'
import { bodyParts, challengeStatuses, goalFrequencies, goalTypes, unitsOfTime, weekDays } from '@/lib/config'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'

interface Props {
  params: {
    challengeId: string
  }
}

export default async function Settings ({ params }: Props) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }

  const challenge = await prisma.challenge.findUnique({
    where: {
      id: params.challengeId
    }
  })

  if (!challenge || challenge.userId !== session.user?.id) {
    notFound()
  }

  return (
    <ProtectedPage>
      <PageHeader heading="Configuración" text="Datos de configuración de tu reto" />
      <div>
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-xl">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="revisions">Revisiones</TabsTrigger>
            <TabsTrigger value="goals">Objetivos</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General</CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="name">Nombre</Label>
                  <Input type="text" name='name' disabled value={challenge.name} />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="status">Estado</Label>
                  <Input type="text" name='status' disabled value={challengeStatuses.find((s) => s.id === challenge.status)?.title} />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="startDate">Fecha inicio</Label>
                  <Input type="text" name='startDate' disabled value={formatDate(challenge.startDate.toDateString())} />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="endDate">Fecha fin</Label>
                  <Input type="text" name='endDate' disabled value={formatDate(challenge.endDate.toDateString())} />
                </div>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="revisions">
            <Card>
              <CardHeader>
                <CardTitle>Revisiones</CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="revisionFrequency">Frecuencia revisiones</Label>
                  <Input type="text" name='revisionFrequency' disabled value={`${challenge.revisionFrequencyNumber} ${challenge.revisionFrequencyNumber > 1 ? 'veces' : 'vez'} por ${unitsOfTime.find((s) => s.id === challenge.revisionFrequencyUnitOfTime)?.title?.toLowerCase()}`} />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="dietLog">Controlar dieta</Label>
                  <Input type="text" name='dietLog' disabled value={`${challenge.includeDietLog ? ('Si, ' + challenge.monthlyCheatMeals + ' cheat meals al mes') : 'No'}`} />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="weeklyTrainingDays">Días de entreno</Label>
                  { weekDays.map((item) => (
                    <div className="flex items-center space-x-2" key={`weekDay_${item.id}`}>
                      <Checkbox disabled checked={challenge.weeklyTrainingDays.find((challengeWeekDay) => challengeWeekDay === item.id) !== undefined} />
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {item.title}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col w-full max-w-sm items-top gap-1.5">
                  <Label htmlFor="name" className='mb-1'>Datos a registrar</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox disabled checked={challenge.includeRevisionBodyWeight} />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Peso
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox disabled checked={challenge.includeRevisionBodyPhotos} />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Fotos
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox disabled checked={challenge.includeRevisionBodyParts} />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Medidas
                    </label>
                  </div>
                </div>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="goals">
            <Card>
              <CardHeader>
                <CardTitle>Objetivos</CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                <div className="grid w-full max-w-sm items-center gap-1.5 hidden">
                  <Label htmlFor="name" className='mb-1'>Objetivos</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox disabled checked={challenge.includeWeightGoal} />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Aumentar o reducir peso
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox disabled checked={challenge.includeBodyPartGoals} />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Mejorar medidas corporales
                    </label>
                  </div>
                </div>
                { challenge.includeWeightGoal && (
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="weightGoal">Peso</Label>
                    <Input type="text" name='weightGoal' disabled value={`${goalTypes.find((s) => s.id === challenge.weightGoal?.type)?.title} ${challenge.weightGoal?.amount}kg ${goalFrequencies.find((s) => s.id === challenge.weightGoal?.frequency)?.title?.toLowerCase()}`} />
                  </div>
                )}

                { challenge.includeBodyPartGoals && challenge.bodyPartGoals !== null && challenge.bodyPartGoals.map((bodyPartGoal, index) => (
                  <div className="grid w-full max-w-sm items-center gap-1.5" key={`bodyPartGoal_${index}`}>
                    <Label htmlFor="weightGoal">{bodyParts.find((s) => s.id === bodyPartGoal.bodyPart)?.title}</Label>
                    <Input type="text" name='weightGoal' disabled value={`${goalTypes.find((s) => s.id === bodyPartGoal.type)?.title} ${bodyPartGoal.amount}kg ${goalFrequencies.find((s) => s.id === bodyPartGoal.frequency)?.title?.toLowerCase()}`} />
                  </div>
                ))}

              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedPage>
  )
}

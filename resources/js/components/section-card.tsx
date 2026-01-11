import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingDown, TrendingUp } from "lucide-react";

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          {/* <CardDescription>Registrasi</CardDescription> */}
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-2xl">
            $1,250.00
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 text-muted-foreground">
            Jumlah berkas di Registrasi
            <TrendingUp className="size-4" />
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          {/* <CardDescription>Verifikasi</CardDescription> */}
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-2xl">
            1,234
          </CardTitle>
          
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 text-muted-foreground">
            Jumlah berkas di Verikasi 
            <TrendingDown className="size-4" />
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          {/* <CardDescription>Penolakan</CardDescription> */}
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-2xl">
            45,678
          </CardTitle>
          
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 text-muted-foreground">
            Jumlah berkas Penolakan
            <TrendingUp className="size-4" />
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          {/* <CardDescription>Sp2d</CardDescription> */}
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-2xl">
            4.5%
          </CardTitle>
          
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 text-muted-foreground">
            Jumlah berkas ter Sp2d
            <TrendingDown className="size-4" />
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

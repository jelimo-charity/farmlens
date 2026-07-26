import type { ClimateCropMatrixEntry } from "@/lib/report-utils";

interface Props {
    data: ClimateCropMatrixEntry[];
}

export function ClimateCropMatrixCard({ data }: Props) {

    const events = Object.keys(data[0] ?? {}).filter(
        (k) => k !== "crop"
    );

    return (
        <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h3 className="mb-4 font-semibold">
                Climate Event vs Crop
            </h3>

            <div className="overflow-auto">
                <table className="min-w-full border-collapse">

                    <thead>
                        <tr>
                            <th className="p-2 text-left">
                                Crop
                            </th>

                            {events.map(event => (
                                <th
                                    key={event}
                                    className="p-2 text-center"
                                >
                                    {event}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>

                        {data.map(row => (

                            <tr key={row.crop}>

                                <td className="border p-2 font-medium">
                                    {row.crop}
                                </td>

                                {events.map(event => {

                                    const value = Number(row[event]);

                                    const color =
                                        value === 0
                                            ? "bg-gray-50"
                                            : value < 5
                                            ? "bg-green-100"
                                            : value < 10
                                            ? "bg-yellow-200"
                                            : value < 20
                                            ? "bg-orange-300"
                                            : "bg-red-400 text-white";

                                    return (
                                        <td
                                            key={event}
                                            className={`border text-center p-2 ${color}`}
                                        >
                                            {value}
                                        </td>
                                    );
                                })}
                            </tr>

                        ))}

                    </tbody>

                </table>
            </div>
        </div>
    );
}
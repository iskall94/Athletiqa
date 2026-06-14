import { Form, useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import { Button } from "../../../shared/ui/button";
import { FormField, TextArea } from "../../../shared/ui/input";

export function UpdatePostForm() {

    const { post } = useLoaderData();

    const navigate = useNavigate();
    const navigation = useNavigation();

    const isSaving = navigation.state === "submitting";
    const currentMediaUrl = post?.mediaContents?.[0]?.mediaUrl || post?.mediaUrl || post?.imageUrl || "";


    return (
        <main className="min-h-screen bg-gray-50/50 py-12 px-4">
            <div className="max-w-[40rem] mx-auto flex flex-col gap-6">

                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="w-fit text-sm text-gray-500 hover:text-primary transition-colors"
                >
                    ← Tillbaka
                </button>

                {/* Form sends the data updatePostAction */}
                <Form method="post" className="w-full bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold mb-6 text-indigo-950">Redigera inlägg</h2>
                    <FormField
                        label="Rubrik"
                        type="text"
                        name="title"
                        defaultValue={post?.title}
                        required
                    />

                    <div className="flex flex-col gap-2 mt-4 mb-6">
                        <label className="text-sm font-medium text-gray-700">Beskrivning</label>
                        <TextArea
                            name="content"
                            defaultValue={post?.content}
                            required
                        />
                    </div>

                    <FormField
                        label="Bild URL(valfri)"
                        type="text"
                        name="mediaUrl"
                        defaultValue={post.mediaUrl || post.imageUrl}
                    />

                    <div className="flex justify-between items-center gap-4 border-t pt-4 mt-6">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Avbryt
                        </button>
                        <Button type="submit" disabled={isSaving}>
                            {isSaving ? "Sparar..." : "Spara ändringar"}
                        </Button>
                    </div>
                </Form>
            </div>
        </main>
    );
}
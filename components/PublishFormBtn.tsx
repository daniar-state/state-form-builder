import { PublishForm } from "@/actions/form";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FaSpinner } from "react-icons/fa";
import { MdOutlinePublish } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

function PublishFormBtn({ id }: { id: number }) {
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  async function publishForm() {
    try {
      await PublishForm(id);
      toast({
        title: "Успешно",
        description: "Ваша форма теперь доступна для публики",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Что-то пошло не так",
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400">
          <MdOutlinePublish className="h-4 w-4" />
          Опубликовать
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы абсолютно уверены?</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие нельзя отменить. После публикации вы не сможете редактировать форму. <br />
            <br />
            <span className="font-medium">
              Опубликовав эту форму, вы сделаете ее публичной и сможете собрать представления от людей.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(publishForm);
            }}
          >
            Приступить {loading && <FaSpinner className="animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PublishFormBtn;

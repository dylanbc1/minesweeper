package co.icesi.buscaminas;

import co.icesi.buscaminas.model.BoardGame;

import java.util.Scanner;

public class Main {

    public static void main(String[] args)
    {
        try(com.zeroc.Ice.Communicator communicator = com.zeroc.Ice.Util.initialize(args))
        {
            com.zeroc.Ice.ObjectAdapter adapter = communicator.createObjectAdapterWithEndpoints("LandMines", "ws -p 10000");
            com.zeroc.Ice.Object object = new ServicesImpl();
            adapter.add(object, com.zeroc.Ice.Util.stringToIdentity("LandMines"));
            adapter.activate();
            communicator.waitForShutdown();
        }
    }
    public static void apply(int n, int m) {

        BoardGame bg = new BoardGame();
        int mines = bg.initGame(8,8,10);
        System.out.println("LandMines on the table: "+mines);
//        bg.showAll(true);
//        bg.printBoard();
//        bg.showAll(false);
        bg.printBoard();
        Scanner scanner = new Scanner(System.in);
        int i = scanner.nextInt();
        int j = scanner.nextInt();
        do{
            try {
                boolean r = bg.selectCell(i, j);
                if (r) {
                    System.out.println("you win, Congratulations");
                    break;
                }
                bg.printBoard();
            }catch (RuntimeException e){
                System.out.println(e.getMessage());
                break;
            }
            i = scanner.nextInt();
            j = scanner.nextInt();
        }while (i>=0 && j>=0);
        bg.showAll(true);
        bg.printBoard();
        System.out.println("exit");
        scanner.close();

    }
}